const sessionStorageUtil = () => {
  const getSession = <T = any>(key: string): T => {
    if (typeof window !== 'undefined') {
      const res = sessionStorage.getItem(key);
      if (res) {
        return JSON.parse(res);
      }
    }
    return null as any;
  };
  const setSession = (key: string, value: any) =>
    sessionStorage.setItem(key, JSON.stringify(value));
  const removeSession = (key: string) => sessionStorage.removeItem(key);
  const clearSession = () => sessionStorage.clear();
  return {
    getSession,
    setSession,
    removeSession,
    clearSession,
  };
};
export default sessionStorageUtil;
