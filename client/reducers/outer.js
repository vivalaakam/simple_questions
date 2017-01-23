import { createAction } from 'redux-actions';

const UPDATE_STATE = Symbol('UPDATE_STATE');

export default function outer(reducer) {
  return function outerReducer(state, action) {
    switch (action.type) {
      case UPDATE_STATE:
        return reducer({ ...state, ...action.payload }, action);
      default:
        return reducer(state, action);
    }
  };
}

export const updateState = createAction(UPDATE_STATE);
