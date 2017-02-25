import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import proxy from 'http-proxy-middleware';
import fill from './middleware/fill';
import render from './middleware/render';
import context from './middleware/router-context';


const port = process.env.PORT || 3000;
const app = express();

function getStaticAssets() {
  return (process.env.NODE_ENV === 'development')
    ? require('./middleware/hot-reload') // eslint-disable-line
    : express.static('static');
}

app.use(getStaticAssets());
app.use(cookieParser());
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api', proxy({
  target: process.env.PROXY_SERVER,
  changeOrigin: true,
  logLevel: 'debug',
  pathRewrite: { '^/api': '' },
  onProxyReq: (proxyReq, req) => {
    if (req.body) {
      const bodyData = JSON.stringify(req.body);
      proxyReq.setHeader('Content-Type', 'application/json');
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    }
  }
}));

app.get('/*', fill, context, render);

app.listen(port, () => {
  /* eslint no-console: ["error", { allow: ["log"] }] */
  console.log(`Listening on port ${port}`);
});
