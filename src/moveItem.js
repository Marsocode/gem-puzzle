// check where is null (value = 0) element (is it Neighbor or not)
function getNeighbor(field, item) {
  let nullFound = null;
  if (item.value === 0) return nullFound;
  let nullElement = [];
  const x = item.xColumn;
  const y = item.yRow;
  nullElement.push(field[y][x - 1]);
  nullElement.push(field[y][x + 1]);
  nullElement.push((field[y - 1] !== undefined ? field[y - 1][x] : undefined));
  nullElement.push((field[y + 1] !== undefined ? field[y + 1][x] : undefined));
  nullElement = nullElement.filter((elem) => elem !== undefined);
  nullElement.forEach((elem) => {
    if (elem.value === 0) nullFound = elem;
  });
  return nullFound;
}

// time for animation of field items
const timing = 250;

const winArr = [];
for (let i = 1; i < 64; i += 1) {
  winArr.push(i);
}

function arrayEquals(arr1, arr2) {
  return Array.isArray(arr1) && Array.isArray(arr2)
    && arr1.length === arr2.length
    && arr1.every((val, index) => val === arr2[index]);
}

function checkWin(field) {
  const currentArr = [];
  field.getField().forEach((rows) => {
    rows.forEach((item) => {
      currentArr.push(item.value);
    });
  });

  if (arrayEquals(currentArr.slice(0, currentArr.length - 1), winArr.slice(0, Number(document.querySelector('select').value) ** 2 - 1))) {
    // do not give the ability to save + clear localStorage
    document.getElementById('saveButton').disabled = true;
    document.getElementById('loadButton').disabled = true;
    localStorage.clear();

    field.isWin = true;
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    const winSpeech = document.createElement('p');
    const counter = document.getElementById('move_counter');
    const time = document.getElementById('time');
    winSpeech.innerHTML = `You won in ${time.innerHTML} and ${counter.dataset.value} moves!`;
    overlay.append(winSpeech);
    document.querySelector('.field').append(overlay);
  }
}

export default function moveItem(field, item, cell, isSound) {
  // neighbor - null element
  const neighbor = getNeighbor(field.getField(), item);
  if (!neighbor) {
    return;
  }
  const moveCounts = document.getElementById('move_counter');
  moveCounts.dataset.value = Number(moveCounts.dataset.value) + 1;
  moveCounts.innerHTML = `Moves: ${moveCounts.dataset.value}`;

  const dirX = neighbor.xColumn - item.xColumn;
  const dirY = neighbor.yRow - item.yRow;
  const dirAnimation = (dirX === 0) ? 'Y' : 'X';
  const dir = (dirAnimation === 'X') ? dirX : dirY;

  cell.animate([
    { transform: `translate${dirAnimation}(0%)` },
    { transform: `translate${dirAnimation}(${dir * 5}%)` },
  ], {
    // timing options
    duration: timing,
    iterations: 1,
  });

  if (isSound) {
    const clickSound = new Audio('../assets/sounds/push_sound.mp3');
    clickSound.play();
  }
  // set new value for field items (change value of null element and  clicked element)
  field.getField()[neighbor.yRow][neighbor.xColumn].value = item.value;
  field.getField()[item.yRow][item.xColumn].value = 0;

  setTimeout(() => {
    // set new order for field items
    const neibElement = field.getField()[neighbor.yRow][neighbor.xColumn].order;
    field.getField()[neighbor.yRow][neighbor.xColumn].order = neibElement;
    field.getField()[item.yRow][item.xColumn].order = item.order;

    // set new order for field items div
    const neibDiv = document.querySelector('[data-empty]');
    const neibOrder = neibDiv.style.order;
    const itemOrder = cell.style.order;

    cell.style.order = neibOrder;
    neibDiv.style.order = itemOrder;
    // timing
  }, 0);
  // check combination (win or not)
  checkWin(field);
}
