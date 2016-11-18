<template lang="pug">
  span(v-bind:class="classes") {{tile.value}}
</template>

<script>
  export default {
    props: {
      tile: {
        type: Object,
        required: true,
      },
    },
    computed: {
      classes() {
        const tile = this.tile;
        let classArray = ['tile'];
        classArray.push(`tile${this.tile.value}`);
        if (!tile.mergedInto) {
          classArray.push(`position_${tile.row}_${tile.column}`);
        }
        if (tile.mergedInto) {
          classArray.push('merged');
        }
        if (tile.isNew()) {
          classArray.push('new');
        }
        if (tile.hasMoved()) {
          classArray.push(`row_from_${tile.fromRow()}_to_${tile.toRow()}`);
          classArray.push(`column_from_${tile.fromColumn()}_to_${tile.toColumn()}`);
          classArray.push('isMoving');
        }

        return classArray.join(' ');
      },
    },
  };
</script>
<style lang="scss" scopre>
  @keyframes newTile {
    from {
      transform: scale(0);
    }

    to {
      transform: scale(1);
    }
  }

  .tile {
    position: absolute;
    width: 110px;
    height: 110px;
    margin: 6px;
    line-height: 90px;
    display: inline-block;
    font-size: 55px;
    font-weight: bold;
    text-align: center;
    vertical-align: middle;
    border-radius: 7px;
    font-family: "Clear Sans";
    color: #766;
    background-color: #dcb;
    user-select: none;
    cursor: default;

    &.merged {
      display: none;

      &.isMoving {
        display: inline;
      }
    }

    &.new {
      animation-duration: 0.20s;
      animation-name: newTile;
      animation-fill-mode: forwards;
      animation-delay: 0.15s;
      transform: scale(0);
    }
  }

  .tile0 {
    background-color: #dcb;
  }

  .tile2 {
    background-color: #eee;
  }

  .tile4 {
    background-color: #eec;
  }

  .tile8 {
    color: #ffe;
    background-color: #fb8;
  }

  .tile16 {
    color: #ffe;
    background-color: #f96;
  }

  .tile32 {
    color: #ffe;
    background-color: #f75;
  }

  .tile64 {
    color: #ffe;
    background-color: #f53;
  }

  .tile128 {
    color: #ffe;
    background-color: #ec7;
    font-size: 45px;
  }

  .tile256 {
    color: #ffe;
    background-color: #ec6;
    font-size: 45px;
  }

  .tile512 {
    color: #ffe;
    background-color: #ec5;
    font-size: 45px;
  }

  .tile1024 {
    color: #fff;
    background-color: #ec3;
    font-size: 35px;
  }

  .tile2048 {
    color: #fff;
    background-color: #ec2;
    font-size: 35px;
  }
</style>
