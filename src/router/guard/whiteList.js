const whiteList = ['/login','/error/404'];

export default whiteList;

export function isWhite(path) {
  return whiteList.includes(path);
}