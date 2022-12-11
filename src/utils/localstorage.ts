export function setloalStorage(key: string, data: any) {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, data);
  }
}

export function getloalStorage(key: string) {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
}
