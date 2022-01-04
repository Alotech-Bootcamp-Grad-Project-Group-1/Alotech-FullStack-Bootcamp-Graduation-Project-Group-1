import Cookies from "universal-cookie";

// Creates cookie
export function setCookie(key, cookie) {
  const cookies = new Cookies();
  cookies.set(key, cookie, { path: "/" });
}

// Gets cookie
export function getCookie(key) {
  const cookies = new Cookies();
  return cookies.get(key);
}

// Deletes cookie
export function deleteCookie(key) {
  const cookies = new Cookies();
  cookies.remove(key);
}
