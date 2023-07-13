// Sync year in the footer
document.querySelector('#yearFooter').textContent = new Date().getFullYear();

// we use mousedown alot. so we disable the drag default function;
document.addEventListener('dragstart', (e) => {
  e.preventDefault();
});

const LENGTH = 16;

const createCell = () => {
  const cell = document.createElement('div');
  cell.classList.add('cell');
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

// pen eraser ability
let mouseHoverState = false;
let mouseDownState = false;
const getMouseHoverState = () => mouseHoverState;
const getMouseDownState = () => mouseDownState;

// detect mouse up and down and hover in out
const board = document.querySelector('#board');
board.addEventListener('mouseover', () => (mouseHoverState = true));
board.addEventListener('mouseout', () => (mouseHoverState = false));
document.addEventListener('mousedown', () => (mouseDownState = true));
document.addEventListener('mouseup', () => (mouseDownState = false));

const populateCellsListeners = () => {
  const cells = document.querySelectorAll('.cell');
  Array.from(cells).forEach((cell) => {
    cell.addEventListener('mousedown', (e) =>
      e.currentTarget.classList.add('filled')
    );

    cell.addEventListener('mouseover', function () {
      if (getMouseDownState()) this.classList.add('filled');
    });
  });
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

  populateCellsListeners();
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
