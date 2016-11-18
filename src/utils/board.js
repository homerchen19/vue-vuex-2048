import Tile from './tile';

const rotateLeft = matrix => {
  const rows = matrix.length;
  const columns = matrix[0].length;
  let res = [];
  for (let row = 0; row < rows; row++) {
    res.push([]);
    for (let column = 0; column < columns; column++) {
      res[row][column] = matrix[column][columns - row - 1];
    }
  }
  return res;
};

class Board {
  constructor() {
    this.tiles = [];
    this.cells = [];
    this.size = 4;
    for (let i = 0; i < (this.size * this.size);) {
      this.cells[(i / 4)] = [this.addTile(0, 0, 0, i), this.addTile(0, 0, 0, i + 1), this.addTile(0, 0, 0, i + 2), this.addTile(0, 0, 0, i + 3)]; // eslint-disable-line
      i += 4;
    }
    for (let j = 0; j < 2; j++) {
      this.addRandomTile();
    }
    this.setPositions();
    this.won = false;
    this.fourProbability = 0.1;
    this.deltaX = [-1, 0, 1, 0];
    this.deltaY = [0, -1, 0, 1];
  }

  addTile(value, row, col, id) {
    const res = new Tile(value, row, col, id);
    this.tiles.push(res);
    return res;
  }

  addRandomTile() {
    let emptyCells = [];
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        if (this.cells[row][col].value === 0) {
          emptyCells.push({ row, col });
        }
      }
    }

    const index = ~~(Math.random() * emptyCells.length);
    const cell = emptyCells[index];
    const newValue = Math.random() < this.fourProbability ? 4 : 2;
    this.cells[cell.row][cell.col] = this.addTile(newValue, cell.row, cell.col, this.cells[cell.row][cell.col].id); // eslint-disable-line
  }

  moveLeft() {
    let hasChanged = false;
    for (let row = 0; row < this.size; ++row) {
      const currentRow = this.cells[row].filter(tile => tile.value !== 0);
      let resultRow = [];
      for (let target = 0; target < this.size; ++target) {
        let targetTile = currentRow.length ? currentRow.shift() : this.addTile();
        if (currentRow.length > 0 && currentRow[0].value === targetTile.value) {
          let tile1 = targetTile;
          targetTile = this.addTile(targetTile.value);
          tile1.mergedInto = targetTile;
          let tile2 = currentRow.shift();
          tile2.mergedInto = targetTile;
          targetTile.value += tile2.value;
        }
        resultRow[target] = targetTile;
        this.won |= (targetTile.value === 2048);
        hasChanged |= (targetTile.value !== this.cells[row][target].value);
      }
      this.cells[row] = resultRow;
    }

    return hasChanged;
  }

  setPositions() {
    this.cells.forEach((row, rowIndex) => {
      row.forEach((tile, columnIndex) => {
        tile.oldRow = tile.row;
        tile.oldColumn = tile.column;
        tile.row = rowIndex;
        tile.column = columnIndex;
        tile.markForDeletion = false;
      });
    });
  }

  move(direction) {
    this.learOldTiles();
    for (let i = 0; i < direction; ++i) {
      this.cells = rotateLeft(this.cells);
    }
    for (let i = direction; i < this.size; ++i) {
      this.cells = rotateLeft(this.cells);
    }
    if (this.moveLeft()) {
      this.addRandomTile();
    }
    this.setPositions();
    return this;
  }

  clearOldTiles() {
    this.tiles = this.tiles.filter(tile => tile.markForDeletion === false);
    this.tiles.forEach(tile => {
      tile.markForDeletion = true;
    });
  }

  hasWon() {
    return this.won;
  }

  hasLost() {
    let canMove = false;
    for (let row = 0; row < this.size; ++row) {
      for (let column = 0; column < this.size; ++column) {
        canMove |= (this.cells[row][column].value === 0);
        for (let dir = 0; dir < 4; ++dir) {
          const newRow = row + this.deltaX[dir];
          const newColumn = column + this.deltaY[dir];
          if (newRow < 0 || newRow >= this.size || newColumn < 0 || newColumn >= this.size) {
            continue;
          }
          canMove |= (this.cells[row][column].value === this.cells[newRow][newColumn].value);
        }
      }
    }
    return !canMove;
  }
}

export default Board;
