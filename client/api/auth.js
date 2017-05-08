import Rest from './rest';

export default class Auth extends Rest {
  constructor() {
    super('/api/auth');
  }

  current() {
    return this.getQuery(`${this.base_url}/`);
  }

  auth({ email, password }) {
    return this.postQuery(this.base_url, { email, password });
  }

  logout() {
    return this.getQuery(`${this.base_url}/logout`);
  }
}
