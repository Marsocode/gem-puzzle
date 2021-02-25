// main
const main = document.createElement('main');

// Top container
const topDiv = document.createElement('div');
topDiv.className = 'top_container';

// Bottom container
const bottomDiv = document.createElement('div');
bottomDiv.className = 'bottom_container';

// Field size selector
const fieldSizeSelector = document.createElement('select');
const options = [3, 4, 5, 6, 7, 8];

// Moves counter
const counter = document.createElement('div');
counter.id = 'move_counter';

// Add time
const timeDiv = document.createElement('div');
timeDiv.id = 'time';
timeDiv.innerHTML = '00:00';

// New Game button
const gameButton = document.createElement('button');
gameButton.className = 'controlButton';
gameButton.id = 'gameButton';
gameButton.innerHTML = 'New Game';

// Pause/resume button
const pauseButton = document.createElement('button');
pauseButton.id = 'pauseButton';
pauseButton.className = 'controlButton';
pauseButton.innerHTML = 'Pause';

// Volume/mute button
const soundButton = document.createElement('button');
soundButton.id = 'soundButton';
soundButton.classList.add('controlButton', 'volume');

// Save/load buttons
const saveButton = document.createElement('button');
saveButton.id = 'saveButton';
saveButton.className = 'controlButton';
saveButton.innerHTML = 'Save game';
saveButton.disabled = true;

const loadButton = document.createElement('button');
loadButton.id = 'loadButton';
loadButton.className = 'controlButton';
loadButton.innerHTML = 'Load game';

// choose puzzle type button
const chooseType = document.createElement('button');
chooseType.className = 'controlButton';
chooseType.id = 'chooseType';
chooseType.innerHTML = 'Number Puzzle';

export {
  main, topDiv, bottomDiv, fieldSizeSelector, options, counter, timeDiv,
  gameButton, pauseButton, soundButton, saveButton, loadButton, chooseType,
};
