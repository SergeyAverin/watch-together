export const parsMessage = (message: string) => {
  return JSON.parse(message);
};

export const stringifyMessage = (message: Object) => {
  return JSON.stringify(message);
};
