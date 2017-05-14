import queryString from 'query-string';
import Rest from './rest';

export default class User extends Rest {
  constructor() {
    super('/api/user');
  }

  update(data) {
    return this.postQuery(this.base_url, data);
  }

  password({ password, password_confirmation }) {
    return this.postQuery(`${this.base_url}/password`, { password, password_confirmation });
  }

  fetch() {
    return this.getQuery(this.base_url);
  }

  list(users = []) {
    const string = queryString.stringify({ users }, { arrayFormat: 'bracket' });
    return this.getQuery(`${this.base_url}/list?${string}`);
  }
}
