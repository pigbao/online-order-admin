const whiteList = ['/login'];

export default whiteList;

export function isWhite(path) {
  return whiteList.includes(path);
}
