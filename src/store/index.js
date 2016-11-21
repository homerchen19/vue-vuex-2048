import Vue from 'vue';
import Vuex from 'vuex';
import VueCookie from 'vue-cookie';
import Board from '../utils/board';
import mutations from './mutations';

Vue.use(Vuex);
Vue.use(VueCookie);

console.log(Vue.cookie.get('bestScore'));
let bestScore = Vue.cookie.get('bestScore') ? Vue.cookie.get('bestScore') : 0;

const state = {
  score: 0,
  bestScore,
  board: new Board(),
};

export default new Vuex.Store({
  state,
  mutations,
});
