<template lang='pug'>
  div#app(v-on:keydown="handleKeyDown")
    info
    div.board
      div(v-for="r_item in board.cells")
        cell(v-for="c_item in r_item")
</template>

<script>
  import Info from './Info';
  import Cell from './Cell';
  import Board from '../utils/board';

  export default {
    data() {
      return {
        board: new Board(),
      };
    },
    // ready() {
    //   window.addEventListener('keydown', this.handleKeyDown.bind(this));
    // },
    // beforeDestroy() {
    //   window.removeEventListener('keydown', this.handleKeyDown.bind(this));
    // },
    computed: {
      tiles() {
        return this.board.tiles.filter(tile => tile.value !== 0);
      },
    },
    methods: {
      handleKeyDown(event) {
        if (this.board.hasWon()) {
          return;
        }
        if (event.keyCode >= 37 && event.keyCode <= 40) {
          event.preventDefault();
          const direction = event.keyCode - 37;
          this.board.move(direction);
        }
      },
      onRestart() {
        this.board = new Board();
      },
    },
    components: {
      Info,
      Cell,
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

  .board {
    margin-top: 20px;
    position: relative;
    padding: 10px;
    cursor: default;
    background: #bbada0;
    border-radius: 6px;
    width: 500px;
    height: 500px;
    box-sizing: border-box;
  }
</style>
