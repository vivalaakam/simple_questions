import { combineReducers } from 'redux';

import list, { fetchQuestionsAction } from './list';
import search, { searchQuestionsAction, getQuestionsSearchWatcher } from './search';
import question, { getQuestionWatcher, fetchQuestionAction, resetQuestionInitial } from './question';
import filter from './filter';

export default function questions(...props) {
  return combineReducers({
    filter,
    list,
    search,
    question
  })(...props);
}

if (!questions.name) {
  questions.name = 'questions';
}

export {
  resetQuestionInitial,
  getQuestionWatcher,
  getQuestionsSearchWatcher,
  fetchQuestionAction,
  fetchQuestionsAction,
  searchQuestionsAction
};
