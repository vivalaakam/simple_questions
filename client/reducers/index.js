import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import outer from './outer';
import auth from './auth';
import modal from './modal';
import questions from './questions';
import notifications from './notifications';

export default function (ext = {}) {
  return outer(combineReducers({ auth, modal, routing, questions, notifications, ...ext }));
}
