import Rest from './rest';

export default class Questions extends Rest {
  constructor() {
    super('/api/questions');
  }

  addition(id, { text }) {
    return this.postQuery(`${this.base_url}/${id}/addition`, { text });
  }
}
