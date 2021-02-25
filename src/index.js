import Field from './field';
import showField from './drawField';
import Timer from './utils/timer';
import {
  main, topDiv, bottomDiv, fieldSizeSelector, options, counter, timeDiv,
  gameButton, pauseButton, soundButton, saveButton, loadButton, chooseType,
} from './constants';
import './css/styles.css';

let newGame = false;
let firstStart = true;
let isPause = false;
let field;
let localSound = true;
let totalSeconds = 0;
let isLoad = false;
let changeBackPuzzle = false;

document.body.prepend(main);

// change field size selector
options.forEach((option) => {
  const opt = document.createElement('option');
  opt.innerHTML = `${option} x ${option}`;
  if (option === 4) opt.selected = 'selected';
  opt.value = option;
  fieldSizeSelector.append(opt);
});

if (typeof localStorage.getItem('field') !== 'undefined' && localStorage.getItem('field') !== null) {
  loadButton.disabled = false;
} else {
  loadButton.disabled = true;
}

chooseType.onclick = () => {
  changeBackPuzzle = !changeBackPuzzle;

  if (changeBackPuzzle) {
    const fieldItems = document.querySelectorAll('.field_item');
    fieldItems.forEach((item) => {
      item.classList.add('backGroundChange');
    });
    chooseType.innerHTML = 'Image Puzzle';
  } else {
    const fieldItems = document.querySelectorAll('.field_item');
    fieldItems.forEach((item) => {
      item.classList.remove('backGroundChange');
    });
    chooseType.innerHTML = 'Number Puzzle';
  }
};

const addOverlay = (fieldDiv) => {
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  const winSpeech = document.createElement('p');
  winSpeech.innerHTML = 'To start game push "New Game"';
  overlay.append(winSpeech);
  fieldDiv.append(overlay);
};

const initField = (size) => {
  counter.dataset.value = 0;
  counter.innerHTML = `Moves: ${counter.dataset.value}`;

  topDiv.append(timeDiv, counter, fieldSizeSelector);
  bottomDiv.append(gameButton, soundButton, pauseButton, saveButton, loadButton, chooseType);
  main.append(topDiv);

  field = new Field(size);

  if (firstStart) {
    field.generateField(true);
    firstStart = false;
  } else {
    field.generateField(false);
  }

  field.isSound = localSound;

  const fieldDiv = document.createElement('div');
  fieldDiv.className = 'field';
  fieldDiv.style.gridTemplateColumns = `repeat(${fieldSizeSelector.value}, 1fr)`;
  fieldDiv.style.gridTemplateRows = `repeat(${fieldSizeSelector.value}, 1fr)`;

  // fieldDiv
  main.append(fieldDiv);

  // draw field with field items
  showField(field);
  addOverlay(fieldDiv);
  main.append(bottomDiv);
};

saveButton.onclick = () => {
  localStorage.setItem('field', JSON.stringify(field));
  localStorage.setItem('size', field.fieldSize);
  localStorage.setItem('moves', counter.dataset.value);
  localStorage.setItem('time', totalSeconds);

  loadButton.disabled = false;
};

const addZero = (value) => {
  const str = `${value}`;
  if (str.length < 2) {
    return `0${str}`;
  }
  return str;
};

const showTime = () => {
  totalSeconds += 100;
  // minutes = totalSeconds / 60
  timeDiv.innerHTML = `${addZero(parseInt(parseInt(totalSeconds / 1000, 10) / 60, 10))}:${addZero(parseInt(totalSeconds / 1000, 10) % 60)}`;
};

const initTimer = new Timer(() => {
  if (newGame || isLoad) {
    showTime();
    initTimer.resume();
  }
  if (field.isWin) {
    initTimer.pause();
  }
}, 100);

loadButton.onclick = () => {
  if (typeof localStorage.getItem('field') !== 'undefined' && localStorage.getItem('field') !== null) {
    loadButton.disabled = false;

    isLoad = true;
    const savedField = JSON.parse(localStorage.getItem('field'));
    const savedSize = localStorage.getItem('size');
    const savedMoves = localStorage.getItem('moves');
    const savedTime = localStorage.getItem('time');

    // create field according local storage data
    main.removeChild(document.querySelector('.field'));
    field = new Field();
    field.fieldSize = savedField.fieldSize;
    field.fieldYRows = savedField.fieldYRows;
    field.fieldXColumns = savedField.fieldXColumns;
    field.isSound = savedField.isSound;
    field.isWin = savedField.isWin;

    const fieldDiv = document.createElement('div');
    fieldDiv.className = 'field';
    fieldDiv.style.gridTemplateColumns = `repeat(${field.fieldSize}, 1fr)`;
    fieldDiv.style.gridTemplateRows = `repeat(${field.fieldSize}, 1fr)`;
    main.insertBefore(fieldDiv, bottomDiv);
    showField(field);

    fieldSizeSelector.value = savedSize;
    counter.dataset.value = savedMoves;
    counter.innerHTML = `Moves: ${counter.dataset.value}`;

    // load saved time from local storage and turn on Timer
    totalSeconds = Number(savedTime);
    showTime();
    initTimer.resume();
  } else {
    loadButton.disabled = true;
  }
};

soundButton.onclick = () => {
  localSound = !localSound;
  field.isSound = localSound;
  if (field.isSound) {
    soundButton.classList.remove('mute');
    soundButton.classList.add('volume');
  } else {
    soundButton.classList.add('mute');
    soundButton.classList.remove('volume');
  }
};

fieldSizeSelector.onchange = () => {
  firstStart = true;

  // to restart timer
  newGame = false;
  initTimer.pause();

  document.querySelector('main').innerHTML = '';
  initField(Number(fieldSizeSelector.value));
  chooseType.innerHTML = 'Number Puzzle';
};

gameButton.onclick = () => {
  newGame = true;
  totalSeconds = 0;

  if (newGame) {
    // turn on timer
    initTimer.resume();
    document.querySelector('main').innerHTML = '';
    initField(Number(fieldSizeSelector.value));
    const overlay = document.querySelector('.overlay');
    document.querySelector('.field').removeChild(overlay);
    firstStart = false;

    chooseType.innerHTML = 'Number Puzzle';

    // give the opportunity to save
    saveButton.disabled = false;
  }
};

const pause = () => {
  isPause = !isPause;

  if (isPause) {
    pauseButton.innerHTML = 'Continue';
    initTimer.pause();
  } else {
    pauseButton.innerHTML = 'Pause';
    initTimer.resume();
  }
};

pauseButton.onclick = () => {
  pause();
};

document.addEventListener('DOMContentLoaded', () => {
  initField(4);
});
