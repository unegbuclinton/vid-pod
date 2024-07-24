export const addParamToUrl = (url: string, param: string, value: string) => {
  const urlObj = new URL(url, window.location.origin);
  urlObj.searchParams.set(param, value);
  return urlObj.toString();
};
