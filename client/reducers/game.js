import { createAction } from 'redux-actions';

const GAME_START = Symbol('GAME_START');
const GAME_FINISH = Symbol('GAME_FINISH');

const $$initialState = {
  in_progress: false
};

export default function game($$state = $$initialState, { type }) {
  switch (type) {
    case GAME_START:
      return { in_progress: true };
    case GAME_FINISH:
      return { in_progress: false };
    default:
      return $$state;
  }
}

if (!game.name) {
  game.name = 'game';
}

const gameStart = createAction(GAME_START);
const gameFinish = createAction(GAME_FINISH);
export {
  gameStart, gameFinish
};
