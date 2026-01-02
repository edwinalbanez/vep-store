const useLocalStorage = (key) => {

  const setItem = (value) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  const getItem = () => {
    const value = window.localStorage.getItem(key) || null;
    return JSON.parse(value);
  }

  return [setItem, getItem];
}

export { useLocalStorage };