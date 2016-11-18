<template lang='pug'>
  section.info
    div.heading
      h1.title 2048
      div.scores-container
        div.score-container {{ score }}
        div.best-container {{ bestScore }}
    div.sub-heading
      p.game-intro Join the numbers and get to the
        strong  2048 tile!
      a.restart-button New Game
</template>

<script>
export default {
  computed: {
    score() {
      return this.$store.state.score;
    },
    bestScore() {
      return this.$store.state.bestScore;
    },
  },
};
</script>

<style lang="scss" scope>
  .info {
    position: relative;
    top: -20px;
  }
  .heading {
    content: "";
    display: block;
    clear: both;
  }
  h1.title {
    font-size: 80px;
    font-weight: bold;
    margin: 0;
    display: block;
    float: left;
  }
  .scores-container {
    float: right;
  }
  .score-container, .best-container {
    position: relative;
    display: inline-block;
    background: #bbada0;
    margin-top: 20px;
    margin-right: 10px;
    padding: 15px 25px;
    font-size: 25px;
    height: 30px;
    line-height: 47px;
    font-weight: bold;
    border-radius: 3px;
    color: #fff;
    text-align: center;

    &:after {
      position: absolute;
      width: 100%;
      top: 10px;
      left: 0;
      text-transform: uppercase;
      font-size: 13px;
      line-height: 13px;
      text-align: center;
      color: #eee4da;
    }
  }
  .score-container:after {
    content: "Score";
  }
  .best-container:after {
    content: "Best";
  }
  .sub-heading:after {
    content: "";
    display: block;
    clear: both;
  }
  p {
    margin-top: 0;
    margin-bottom: 10px;
    line-height: 1.65;

    &.game-intro {
      float: left;
      line-height: 42px;
      margin-bottom: 0;
    }
    strong.important {
      text-transform: uppercase;
    }
  }
  a {
    color: #776e65;
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;

    &.restart-button {
      float: right;
      display: inline-block;
      height: 40px;
      margin-right: 10px;
      padding: 0 20px;
      line-height: 42px;
      background: #9d846b;
      border-radius: 3px;
      text-decoration: none;
      text-align: center;
      color: #f9f6f2;
      transition: background 0.3s ease-out;

      &:hover {
        background: #826952;
      }
    }
  }
</style>
