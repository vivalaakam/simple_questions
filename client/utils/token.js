export default {
  getToken() {
    if (localStorage.getItem('jwtToken')) {
      return `JWT ${localStorage.getItem('jwtToken')}`;
    }
    return null;
  },
  setToken(jwt) {
    if (jwt) {
      const [, token] = jwt.split(' ');
      localStorage.setItem('jwtToken', token);
    }
  }
};
