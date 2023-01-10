const useLocalstorage = () => {
  const getLocal = (key: string) => {
    return JSON.parse(localStorage.getItem(key) || '');
  };
  const setLocal = (key: string, value: object) => localStorage.setItem(key, JSON.stringify(value));
  const removeLocal = (key: string) => localStorage.removeItem(key);
  const clearLocal = () => localStorage.clear();
  return {
    getLocal,
    setLocal,
    removeLocal,
    clearLocal,
  };
};
export default useLocalstorage;
