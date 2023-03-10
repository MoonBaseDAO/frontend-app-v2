
export const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(' ')
}

export const getDaoId = (daoAddr: string) => {
  const names = daoAddr.split('.');
  return names[0];
}