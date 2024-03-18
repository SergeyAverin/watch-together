import Cookies from "js-cookie";

export const getCookie = (name: string): string | undefined => {
  const value = Cookies.get(name);
  return value;
};

export const isCookieExist = (name: string): boolean => {
  const value = getCookie(name);
  return value ? true : false;
};

export const setCookie = (name: string, value: string, expires: number) => {
  Cookies.set(name, value, {
    expires: expires,
  });
};

export const removeCookie = (name: string) => {
  Cookies.remove(name);
};
