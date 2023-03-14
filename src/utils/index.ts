
export const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(' ')
}

export const getDaoId = (daoAddr: string) => {
  if(!daoAddr) return "";
  const names = daoAddr.split('.');
  return names[0];
}

export const convertDuration = (duration: number) => {
  let utcSeconds = duration / 1e9;
  let epoch = new Date(0);
  epoch.setUTCSeconds(utcSeconds);
  return epoch;
};