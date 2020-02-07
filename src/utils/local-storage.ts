
export function getFromLocalStorage(key: string): any {
  const value = localStorage.getItem(key);
  //debugger;
  try {
    return JSON.parse(value) || {};
  } catch (e) {
    return {};
  }
}

export function removeFromLocalStorage(key: string | string[]) {
  key = Array.isArray(key) ? key : [key];
  key.map((k: string) => localStorage.removeItem(k));
}

export function setToLocalStorage(key: string, data: any): any {
  let newData = data;
  try {
    newData = JSON.stringify(data);
  } catch (e) {
    //do nothing
  }

  return localStorage.setItem(key, newData);

}

export function clearLocalStorage() {
  localStorage.clear();
}
