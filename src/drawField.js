import moveItem from './moveItem';

function getItemByValue(field, value) {
  let localItem = null;
  field.forEach((rows) => {
    rows.forEach((item) => {
      if (item.value === value) localItem = item;
    });
  });
  return localItem;
}

let initCell;
const clickSound = new Audio('./assets/sounds/push_sound.mp3');

// draw Field with field Items
export default function showField(field) {
  field.getField().forEach((rows) => {
    rows.forEach((item) => {
      const cell = document.createElement('div');
      cell.classList = 'field_item';
      cell.innerHTML = item.value;
      cell.style.backgroundImage = 'url(./assets/img/nature.jpg)';

      const xPos = ((item.value) % field.fieldSize === 0)
        ? field.fieldSize - 1 : ((item.value) % field.fieldSize) - 1;
      const yPos = parseInt((item.value - 1) / field.fieldSize, 10);

      cell.style.backgroundPositionX = `${(xPos) * (100 / (field.fieldSize - 1))}%`;
      cell.style.backgroundPositionY = `${(yPos) * (100 / (field.fieldSize - 1))}%`;
      cell.style.backgroundSize = `${100 * field.fieldSize}%`;

      cell.style.order = item.order;
      cell.draggable = true;
      cell.droppable = true;

      if (item.value === 0) {
        // for element with value 0
        cell.dataset.empty = true;
        cell.draggable = false;
        cell.style.backgroundImage = 'none';
      }

      document.querySelector('.field').appendChild(cell);
      cell.addEventListener('click', () => {
        if (field.isSound && cell.innerHTML !== '0') clickSound.play();
        moveItem(field, getItemByValue(field.getField(), Number(cell.innerHTML)), cell);
      });

      cell.addEventListener('drag', () => {
        initCell = cell;
      });

      cell.addEventListener('dragover', (e) => {
        e.preventDefault();
      });

      cell.addEventListener('drop', (e) => {
        e.preventDefault();
        if (field.isSound) clickSound.play();
        if (cell.innerHTML === '0') moveItem(field, getItemByValue(field.getField(), Number(initCell.innerHTML)), initCell);
      });
    });
  });
}
