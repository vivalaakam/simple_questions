import fetch from 'node-fetch';

export default async function fill(req, res, next) {
  const initialState = {};
  if (req.cookies && req.cookies.Authorization) {
    const [, token] = req.cookies.Authorization.split(' ');
    if (token) {
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
  }

  res.initialData = initialState;
  next();
}
