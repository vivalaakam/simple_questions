const KEY = 'jwtToken';

export default {
  getToken() {
    if (localStorage.getItem(KEY)) {
      return `JWT ${localStorage.getItem(KEY)}`;
    }
    return null;
  },
  setToken(jwt) {
    if (jwt) {
      const [, token] = jwt.split(' ');
      localStorage.setItem(KEY, token);
      document.cookie = `Authorization=JWT ${token}`;
    }
  },
  removeToken() {
    this.setToken(null);
  }
};
