import { useState, useCallback, useEffect, useRef } from "react";
import { useAudioRecorder } from "../utils/audio-recorder";
import { AudioStreamer } from "../utils/audio-streamer";

const LIVE_API_URL = "wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent";

export type LiveConfig = {
  model: string;
  systemInstruction?: string;
};

export function useLiveAPI({ model, systemInstruction }: LiveConfig) {
  const [connected, setConnected] = useState(false);
  const [isVolume, setIsVolume] = useState(false);
  const websocketRef = useRef<WebSocket | null>(null);
  const audioStreamerRef = useRef<AudioStreamer | null>(null);
  const onMessageRef = useRef<((text: string, sender: 'user' | 'bot', endOfTurn: boolean) => void) | null>(null);

  useEffect(() => {
    audioStreamerRef.current = new AudioStreamer({
      sampleRate: 24000,
      onComplete: () => setIsVolume(false)
    });
    return () => { audioStreamerRef.current?.stop(); };
  }, []);

  const { start: startRecording, stop: stopRecording } = useAudioRecorder({
    onAudioData: (base64) => {
      if (websocketRef.current && websocketRef.current.readyState === WebSocket.OPEN) {
        const message = {
          realtime_input: {
            media_chunks: [{ mime_type: "audio/pcm", data: base64 }]
          }
        };
        websocketRef.current.send(JSON.stringify(message));
      }
    }
  });

  const connect = useCallback(async () => {
    if (websocketRef.current) return;
    const apiKey = process.env.API_KEY;
    const url = `${LIVE_API_URL}?key=${apiKey}`;
    const ws = new WebSocket(url);

    ws.onopen = () => {
      setConnected(true);
      const setupMessage = {
        setup: {
          model: model,
          generation_config: {
            response_modalities: ["AUDIO", "TEXT"],
            speech_config: { voice_config: { prebuilt_voice_config: { voice_name: "Aoede" } } }
          },
          system_instruction: { parts: [{ text: systemInstruction }] }
        }
      };
      ws.send(JSON.stringify(setupMessage));
      startRecording();
    };

    ws.onmessage = async (event) => {
      let data;
      if (event.data instanceof Blob) { data = JSON.parse(await event.data.text()); } 
      else { data = JSON.parse(event.data); }

      if (data.serverContent?.modelTurn?.parts?.[0]?.inlineData) {
        const audioBase64 = data.serverContent.modelTurn.parts[0].inlineData.data;
        setIsVolume(true);
        audioStreamerRef.current?.addPCM16(audioBase64);
      }

      if (data.serverContent?.modelTurn?.parts?.[0]?.text) {
        const text = data.serverContent.modelTurn.parts[0].text;
        onMessageRef.current?.(text, 'bot', false);
      }

      if (data.serverContent?.interrupted) {
          audioStreamerRef.current?.stop();
          setIsVolume(false);
      }
    };

    ws.onclose = () => {
      setConnected(false);
      stopRecording();
      websocketRef.current = null;
    };

    websocketRef.current = ws;
  }, [model, systemInstruction, startRecording, stopRecording]);

  const disconnect = useCallback(() => {
    if (websocketRef.current) {
      websocketRef.current.close();
      websocketRef.current = null;
    }
    stopRecording();
    setConnected(false);
    audioStreamerRef.current?.stop();
  }, [stopRecording]);

  const setOnMessage = (callback: (text: string, sender: 'user' | 'bot', endOfTurn: boolean) => void) => {
      onMessageRef.current = callback;
  };

  return { connect, disconnect, connected, isVolume, setOnMessage };
}