import Vue from 'vue';
import Vuex from 'vuex';
import Board from '../utils/board';
import mutations from './mutations';

Vue.use(Vuex);

const state = {
  score: 0,
  bestScore: 0,
  board: new Board(),
};

export default new Vuex.Store({
  state,
  mutations,
});
