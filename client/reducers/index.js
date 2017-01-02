import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

export default function (ext = {}) {
  return combineReducers({ routing, ...ext });
}
