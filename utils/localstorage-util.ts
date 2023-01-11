const localstorageUtil = () => {
  const getLocal = (key: string) => {
    const res = localStorage.getItem(key);
    if (res) {
      return JSON.parse(res);
    }
    return null;
  };
  const setLocal = (key: string, value: any) => localStorage.setItem(key, JSON.stringify(value));
  const removeLocal = (key: string) => localStorage.removeItem(key);
  const clearLocal = () => localStorage.clear();
  return {
    getLocal,
    setLocal,
    removeLocal,
    clearLocal,
  };
};
export default localstorageUtil;
