import { combineReducers } from 'redux';

import list, { fetchQuestionsAction } from './list';
import question, { getQuestionWatcher , fetchQuestionAction, resetQuestionInitial } from './question';
import filter from './filter';

export default function questions(...props) {
  return combineReducers({
    filter,
    list,
    question
  })(...props);
}

if (!questions.name) {
  questions.name = 'questions';
}

export {
  resetQuestionInitial,
  getQuestionWatcher,
  fetchQuestionAction,
  fetchQuestionsAction
};
