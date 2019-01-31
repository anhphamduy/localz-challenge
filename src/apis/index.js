export { default as getPie } from "./getPie";

/*
 * Create URL based on endpoint and params
 */
const createUrl = (endpoint, params={}) => {
  const host = "pie.now.sh";
  let paramsUrls = "";
  Object.keys(params).forEach(key => {
    paramsUrls += `${String(key)}=${String(params[key])}&`;
  });
  return `https://${host}/${endpoint}?${paramsUrls}`;
};

export default createUrl;
