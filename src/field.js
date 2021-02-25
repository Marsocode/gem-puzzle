import shuffle from './shuffle';
import Item from './item';

export default class Field {
  constructor(size) {
    this.fieldSize = size;
    this.fieldYRows = [];
    this.fieldXColumns = [];
    this.isSound = true;
    this.isWin = false;
  }

  generateField(firstStart) {
    const initArr = new Array(this.fieldSize * this.fieldSize);
    for (let i = 0; i < initArr.length; i += 1) {
      initArr[i] = i + 1;
    }

    // replace last element with 0
    const initRightArr = initArr.slice();
    initRightArr.splice(-1, 1, 0);

    let arrayItems;

    if (!firstStart) {
      arrayItems = shuffle(initArr);
    } else {
      arrayItems = initRightArr;
    }

    for (let y = 0; y < this.fieldSize; y += 1) {
      this.fieldXColumns = [];
      for (let x = 0; x < this.fieldSize; x += 1) {
        const value = arrayItems[(y * this.fieldSize) + x];
        this.fieldXColumns.push(new Item(x, y, value, y * this.fieldSize + x));
      }
      this.fieldYRows.push(this.fieldXColumns);
    }
    return this.fieldYRows;
  }

  getField() {
    return this.fieldYRows;
  }

  getItem(x, y) {
    return this.fieldXColumns[x][y];
  }
}
