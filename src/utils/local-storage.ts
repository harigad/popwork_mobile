
export function getFromLocalStorage(key: string, returnAsIs=false): any {
  const value = localStorage.getItem(key);
  //debugger;
  if(returnAsIs){
    return value;
  }else{
    try {
      return JSON.parse(value) || {};
    } catch (e) {
      return {};
   }
  }
}

export function getUser(): any {
  const value = localStorage.getItem("VB_USER");
  //debugger;
  try {
    let data = JSON.parse(value) || {};
    return data.user;
  } catch (e) {
    return {};
  }
}

export function removeFromLocalStorage(key: string | string[]) {
  key = Array.isArray(key) ? key : [key];
  key.map((k: string) => localStorage.removeItem(k));
}

export function setToLocalStorage(key: string, data: any): any {
  debugger;
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
