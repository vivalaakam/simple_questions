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
      initialState.auth = respAuth;
    } catch (e) {
      console.log(e.message); // eslint-disable-line
    }
  }

  switch (req.originalUrl) {
    case '/todos': {
      const respList = await
        fetch(`${process.env.PROXY_SERVER}/todos`, {
          headers: {
            Authorization: req.cookies.Authorization
          }
        });
      const list = await
        respList.json();
      initialState.todos = { list };
      break;
    }
    default: {
      break;
    }
  }

  res.initialData = initialState;
  next();
}
