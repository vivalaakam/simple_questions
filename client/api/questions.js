import Rest from './rest';

export default class Questions extends Rest {
  constructor() {
    super('/api/questions');
  }

  addition(id, { text }) {
    return this.postQuery(`${this.base_url}/${id}/addition`, { text });
  }

  answer(id, { text }) {
    return this.postQuery(`${this.base_url}/${id}/answer`, { text });
  }

  close(id, answer) {
    return this.postQuery(`${this.base_url}/${id}/close/${answer}`);
  }

  subscribe(id) {
    return this.postQuery(`${this.base_url}/${id}/subscribe`);
  }

  unsubscribe(id) {
    return this.postQuery(`${this.base_url}/${id}/unsubscribe`);
  }

  search(substr) {
    return this.getQuery(`${this.base_url}?search=${substr}`);
  }
}
