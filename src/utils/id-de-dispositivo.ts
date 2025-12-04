export const getDeviceId = (): string => {
  let deviceId = localStorage.getItem('suma_device_id');
  if (!deviceId) {
    // Simulate an IMEI-like identifier
    // Format: IMEI-XXX-XXXX
    deviceId = 'IMEI-' + Math.random().toString(36).substr(2, 3).toUpperCase() + Math.floor(Math.random() * 100) + '-' + Date.now().toString().slice(-4);
    localStorage.setItem('suma_device_id', deviceId);
  }
  return deviceId;
};
