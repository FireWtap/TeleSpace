const formatBytes = (a, b = 0) => {
  if (!+a) return '0 Bytes';
  const c = b < 0 ? 0 : b;
    const d = Math.floor(Math.log(a) / Math.log(1024));
  return `${parseFloat((a / 1024 ** d).toFixed(c))} ${['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'][d]}`;
};

export { formatBytes };
