import { getConfig } from "@/config/near";

export const yoktoNear = 1000000000000000000000000;
export const nearConfig = getConfig(process.env.NODE_ENV || 'development');

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

export const getUserAvatarId = (userId: string) => {
  let num = '';
  for (let i = 0; i < userId.length; i++) {
    num += userId.charCodeAt(i);
  }
  return parseInt(num) % 100;
}

export const isValidInteger = (str: string) => {
  // Check if the string is not empty and contains only digits
  if (str.match(/^\d+$/) !== null) {
    // Parse the string as a number and check if it's an integer
    return Number.isInteger(parseInt(str, 10));
  }
  return false;
}