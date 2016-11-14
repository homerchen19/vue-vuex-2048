<template lang='pug'>
  div#app
    board
</template>

<script>
import Board from './components/Board';

export default {
  name: 'app',
  components: {
    Board,
  },
};
</script>

<style>
  html, body {
    margin: 0;
    padding: 0;
    background: #faf8ef;
    color: #776e65;
    font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;
    font-size: 18px;
  }

  body {
    margin: 80px 0;
  }

  #app {
    width: 500px;
    margin: 0 auto;
  }
</style>
