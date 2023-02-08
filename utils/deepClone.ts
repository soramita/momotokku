type DeepClone = <T>(obj: object) => T;
const deepClone: DeepClone = (obj: object) => {
  return JSON.parse(JSON.stringify(obj));
};
export default deepClone;
