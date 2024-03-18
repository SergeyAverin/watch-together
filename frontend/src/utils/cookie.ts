import Cookies from "js-cookie";

export const getCookie = (name: string): string | undefined => {
  const value = Cookies.get(name);
  return value;
};

export const isCookieExist = (name: string): boolean => {
  const value = Cookies.get(name);
  return name != undefined ? true : false;
};

export const setCookie = (name: string, value: string, days: number) => {
  Cookies.set(name, value);
};
