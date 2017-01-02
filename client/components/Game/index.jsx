import React, { Component, PropTypes } from 'react';

export default class Game extends Component {
  static propTypes = {
    game: PropTypes.object,
    gameStart: PropTypes.func,
    gameFinish: PropTypes.func
  };

  renderButton() {
    const { game, gameFinish, gameStart } = this.props;
    if (game.in_progress) {
      return (
        <button onClick={gameFinish}>End game</button>
      );
    }

    return (
      <button onClick={gameStart}>Start game</button>
    );
  }


  render() {
    return (
      <section>
        <p>
          Game page
        </p>
        <div>
          {this.renderButton()}
        </div>
      </section>
    );
  }
}
