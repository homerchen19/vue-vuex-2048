import 'babel-polyfill';
import Vue from 'vue';
import App from './components/App';
import store from './store';
import './assets/style/tileStyle.scss';

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  render: h => h(App),
});
