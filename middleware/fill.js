import fetch from 'node-fetch';

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
      const respList = await
      fetch(`${process.env.PROXY_SERVER}/questions`);
      const list = await
      respList.json();
      initialState.questions = { list };
      break;
    }
    default: {
      break;
    }
  }

  res.initialData = initialState;
  next();
}
