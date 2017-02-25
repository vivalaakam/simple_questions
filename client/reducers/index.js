import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import outer from './outer';
import auth from './auth';
import modal from './modal';


export default function (ext = {}) {
  return outer(combineReducers({ auth, modal, routing, ...ext }));
}
