import express from 'express';
import bodyParser from 'body-parser';
import render from './render';

const port = process.env.PORT || 3000;
const app = express();

function getStaticAssets() {
  return (process.env.NODE_ENV === 'development')
    ? require('./middleware/hot-reload') // eslint-disable-line
    : express.static('static');
}

app.use(getStaticAssets());
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  res.send(render());
});

app.listen(port, () => {
  /* eslint no-console: ["error", { allow: ["log"] }] */
  console.log(`Listening on port ${port}`);
});
