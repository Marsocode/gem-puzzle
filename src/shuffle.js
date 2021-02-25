const checkArray = (arr) => {
  let check = 0;
  for (let i = 0; i < arr.length ** 2; i += 1) {
    if (arr[i] !== 0) {
      for (let j = 0; j < i; j += 1) {
        if (arr[j] > arr[i]) check += 1;
      }
    } else {
      check += (1 + i) / arr.length;
    }
  }
  return check % 2 === 0;
};

const shuffle = (array) => {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there are elements in the array
  while (currentIndex !== 0) {
    // Pick a random index
    randomIndex = Math.floor(Math.random() * currentIndex);
    // Decrease counter by 1
    currentIndex -= 1;

    // And swap the last element with it
    temporaryValue = array[currentIndex];

    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  // check if array has solution
  const status = checkArray(array);
  if (!status) shuffle(array);

  // put last element
  for (let i = 0; i <= array.length - 1; i += 1) {
    if (array[i] === array.length) {
      array[i] = 0;
      return array;
    }
  }
  return array;
};

export default shuffle;
