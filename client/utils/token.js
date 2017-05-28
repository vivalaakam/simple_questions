const KEY = 'jwtToken';

export default {
  getToken() {
    if (typeof localStorage !== 'undefined' && localStorage.getItem(KEY)) {
      return `JWT ${localStorage.getItem(KEY)}`;
    }
    return null;
  },
  getRawToken() {
    return typeof localStorage !== 'undefined' && && localStorage.getItem(KEY);
  },
  setToken(jwt) {
    if (jwt) {
      const [, token] = jwt.split(' ');
      localStorage.setItem(KEY, token);
      document.cookie = `Authorization=JWT ${token}`;
    }
  },
  removeToken() {
    localStorage.setItem(KEY, null);
    document.cookie = 'Authorization=';
  }
};
