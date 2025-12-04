export const getDeviceId = (): string => {
  let deviceId = localStorage.getItem('suma_device_id');
  if (!deviceId) {
    // Simulate an IMEI-like identifier
    // Format: IMEI-XXX-XXXX-XXXX
    deviceId = 'IMEI-' + Math.floor(Math.random() * 1000).toString().padStart(3, '0') + '-' + Date.now().toString().slice(-8);
    localStorage.setItem('suma_device_id', deviceId);
  }
  return deviceId;
};
