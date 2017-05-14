import queryString from 'query-string';
import Rest from './rest';

export default class User extends Rest {
  constructor() {
    super('/api/user');
  }

  update(data) {
    return this.postQuery(this.base_url, data);
  }

  fetch() {
    return this.getQuery(this.base_url);
  }

  list(users = []) {
    const string = queryString.stringify({ users }, { arrayFormat: 'bracket' });
    return this.getQuery(`${this.base_url}/list?${string}`);
  }
}
