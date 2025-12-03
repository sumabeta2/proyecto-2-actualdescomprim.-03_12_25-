import React, { ErrorInfo, ReactNode } from 'react';

interface Props { children?: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = { hasError: false, error: null };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-lg w-full border border-red-200">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Algo salió mal 😔</h1>
            <button onClick={() => window.location.reload()} className="w-full bg-red-600 text-white py-2 rounded-lg">Recargar</button>
          </div>
        </div>
      );
    }
    return (this as any).props.children;
  }
}