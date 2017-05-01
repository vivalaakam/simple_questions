import Rest from './rest';

export default class Questions extends Rest {
  constructor() {
    super('/api/questions');
  }
}
