<template lang='pug'>
  div#app
    info
    div.board
      div(v-for="r_item in board.cells")
        cell(v-for="c_item in r_item")
      tile-view(v-for="tile in tiles" v-bind:tile="tile")
      overlay(v-bind:board="board" v-bind:onrestart="onRestart")
</template>

<script>
  import Info from './Info';
  import Cell from './Cell';
  import TileView from './TileView';
  import Overlay from './Overlay';
  import Board from '../utils/board';

  export default {
    data() {
      return {
        board: new Board(),
      };
    },
    created: function() { // eslint-disable-line
      window.addEventListener('keydown', this.handleKeyDown.bind(this)); // eslint-disable-line
    },
    beforeDestroy: function() { // eslint-disable-line
      window.removeEventListener('keydown', this.handleKeyDown.bind(this)); // eslint-disable-line
    },
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
      TileView,
      Overlay,
    },
  };
</script>

<style>
  @font-face {
    font-family: "Clear Sans";
    src: url('../assets/clear-sans.ttf') format('truetype');
  }

  html, body {
    margin: 0;
    padding: 0;
    background: #faf8ef;
    color: #776e65;
    font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;
    font-size: 18px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
  }

  #app {
    width: 500px;
    margin-top: 30px;
  }

  .board {
    position: relative;
    padding: 6px;
    cursor: default;
    background: #bbada0;
    border-radius: 6px;
    width: 500px;
    height: 500px;
    box-sizing: border-box;
  }
</style>
