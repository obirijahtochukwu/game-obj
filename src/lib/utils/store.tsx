export const getStore = (name: string) => localStorage.getItem(name);

export const setStore = (name: string, data: any) =>
  localStorage.setItem(name, data);
