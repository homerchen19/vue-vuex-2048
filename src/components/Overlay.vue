<template lang="pug">
  div.overlay(v-show="show")
    p.message {{contents}}
    button.tryAgain-button(v-on:click="onRestart") Try again
</template>

<script>
  export default {
    computed: {
      show() {
        return this.$store.state.board.hasWon() || this.$store.state.board.hasLost();
      },
      contents() {
        if (this.$store.state.board.hasWon()) {
          return 'Good Job!';
        } else if (this.$store.state.board.hasLost()) {
          return 'Game Over';
        }
        return '';
      },
    },
    methods: {
      onRestart() {
        this.$store.commit('restart');
      },
    },
  };
</script>

<style lang="scss" scoped>
  .overlay {
    position: absolute;
    top: 0px;
    bottom: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    left: 0px;
    right: 0px;
    font-size: 55px;
    font-weight: bolder;
    background-color: rgba(221, 221, 221, 0.5);
    border-radius: 7px;

    .message {
      color: #666;
    }
  }

  .tryAgain-button {
    padding: 0;
    background: #9d846b;
    color: #f9f6f2;
    height: 50px;
    width: 200px;
    font-size: 20px;
    font-weight: bold;
    line-height: 42px;
    cursor: pointer;
    border: none;
    border-radius: 3px;
    transition: background 0.3s ease-out;

    &:hover {
      background: #826952;
    }
  }
</style>
