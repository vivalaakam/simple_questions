import fetch from 'node-fetch';
import _ from 'lodash';
import queryString from 'query-string';

export default async function fill(req, res, next) {
  const initialState = {};
  if (req.cookies && req.cookies.Authorization) {
    try {
      const auth = await fetch(`${process.env.PROXY_SERVER}/auth`, {
        headers: {
          Authorization: req.cookies.Authorization
        }
      });

      const respAuth = await auth.json();
      initialState.auth = { ...respAuth, tmp_last_name: respAuth.last_name, tmp_first_name: respAuth.first_name };
    } catch (e) {
      console.log(e.message); // eslint-disable-line
    }
  }

  switch (req.originalUrl) {
    case '/': {
      const respList = await fetch(`${process.env.PROXY_SERVER}/questions`);
      const list = await respList.json();
      const tmpUsers = list.map(question => question.user_id);
      const string = queryString.stringify({ users: _.uniq(tmpUsers) }, { arrayFormat: 'bracket' });
      const userList = await fetch(`${process.env.PROXY_SERVER}/user/list?${string}`);
      const users = await userList.json();
      initialState.questions = { list };
      initialState.users = users.reduce((state, user) => {
        state[user.id] = user;
        return state;
      }, {});
      break;
    }
    case '/create':
      break;
    case '/settings':
      break;
    default: {
      const regex = /^\/([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})$/i;
      const m = regex.exec(req.originalUrl);
      if (m !== null) {
        const respQuestion = await fetch(`${process.env.PROXY_SERVER}/questions/${m[1]}`);
        const question = await respQuestion.json();
        const tmpUsers = question.answers.map(answer => answer.user_id);
        tmpUsers.push(question.user_id);
        const string = queryString.stringify({ users: _.uniq(tmpUsers) }, { arrayFormat: 'bracket' });
        const userList = await fetch(`${process.env.PROXY_SERVER}/user/list?${string}`);
        const users = await userList.json();
        initialState.questions = { question };
        initialState.users = users.reduce((state, user) => {
          state[user.id] = user;
          return state;
        }, {});
      }
      break;
    }
  }

  res.initialData = initialState;
  next();
}
