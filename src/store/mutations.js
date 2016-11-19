import Board from '../utils/board';

const mutations = {
  restart(state) {
    state.board = new Board();
  },
};

export default mutations;
