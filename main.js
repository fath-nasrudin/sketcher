// Sync year in the footer
document.querySelector('#yearFooter').textContent = new Date().getFullYear();

const LENGTH = 16;
let mouseHoverState = false;
let mouseDownState = false;
const getMouseHoverState = () => mouseHoverState;
const getMouseDownState = () => mouseDownState;

document.addEventListener('dragstart', (e) => {
  e.preventDefault();
});

document.addEventListener('mousedown', function (e) {
  mouseDownState = true;
});

document.addEventListener('mouseup', function (e) {
  mouseDownState = false;
});

const createCell = () => {
  const cell = document.createElement('div');
  cell.classList.add('cell');

  cell.addEventListener('mousedown', (e) =>
    e.currentTarget.classList.add('filled')
  );

  cell.addEventListener('mouseover', function () {
    if (getMouseDownState()) this.classList.add('filled');
  });
  return cell;
};

const createRowOfCells = (totalCell) => {
  const row = document.createElement('div');
  row.classList.add('row');
  for (let j = 0; j < totalCell; j++) {
    row.append(createCell());
  }
  return row;
};

const generateBoard = (totalLength = 64) => {
  const board = document.querySelector('#board');
  board.replaceChildren(); // reset
  board.addEventListener('mouseover', () => (mouseHoverState = true));
  board.addEventListener('mouseout', () => (mouseHoverState = false));
  for (let i = 0; i < totalLength; i++) {
    const row = createRowOfCells(totalLength);
    board.append(row);
  }
};

generateBoard(LENGTH);

// controller

// size controller
const gridSizeSlider = document.querySelector('#sizeSliderInput');
gridSizeSlider.value = LENGTH;
gridSizeSlider.addEventListener('input', () => {
  const sizeSliderValue = document.querySelector('#sizeSliderValue');
  sizeSliderValue.textContent = gridSizeSlider.value;
});

const sizeSliderValue = document.querySelector('#sizeSliderValue');
sizeSliderValue.textContent = LENGTH;

const sizeSliderButton = document.querySelector('#sizeSliderButton');
sizeSliderButton.addEventListener('click', () => {
  const size = Number(document.querySelector('#sizeSliderValue').textContent);
  generateBoard(size);
});
