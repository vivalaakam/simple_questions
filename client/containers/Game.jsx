import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import reducer, { gameStart, gameFinish } from '../reducers/game';
import Game from '../components/Game';

const mapStateToProps = state => ({
  game: state.game
});

const mapDispatchToProps = dispatch => bindActionCreators({ gameStart, gameFinish }, dispatch);

function GameContainer(props) {
  return (<Game {...props} />);
}

GameContainer.propTypes = {
  gameStart: PropTypes.func,
  gameFinish: PropTypes.func,
  game: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);

export {
  reducer
};
