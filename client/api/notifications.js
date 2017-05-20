import Rest from './rest';

export default class Notifications extends Rest {
  constructor() {
    super('/api/notifications');
  }

  subscribe(notification, device) {
    return this.postQuery(this.base_url, { notification, device });
  }

  unsubscribe() {
    return this.deleteQuery(this.base_url);
  }

  remove(id) {
    return this.deleteQuery(`${this.base_url}/${id}`);
  }

  clear() {
    return this.postQuery(`${this.base_url}/clear`);
  }
}
