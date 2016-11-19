import delay from 'delay';
import Board from '../utils/board';

const mutations = {
  restart(state) {
    state.board.clean();
    delay(1).then(() => {
      state.board = new Board();
    });
  },
};

export default mutations;
