// Sync year in the footer
document.querySelector('#yearFooter').textContent = new Date().getFullYear();

// we use mousedown alot. so we disable the drag default function;
document.addEventListener('dragstart', (e) => {
  e.preventDefault();
});

const LENGTH = 16;
let activeToolState = 'pen';
const getActiveToolState = () => activeToolState;
const setActiveToolState = (value) => (activeToolState = value);

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
    cell.addEventListener('mousedown', (e) => {
      const activeTool = getActiveToolState();
      if (activeTool === 'pen') {
        e.currentTarget.style.backgroundColor = getPenColor();
      } else if (activeTool === 'eraser') {
        e.currentTarget.style.backgroundColor = '';
      }
    });

    cell.addEventListener('mouseover', function (e) {
      if (getMouseDownState()) {
        const activeTool = getActiveToolState();
        if (activeTool === 'pen') {
          e.currentTarget.style.backgroundColor = getPenColor();
        } else if (activeTool === 'eraser') {
          e.currentTarget.style.backgroundColor = '';
        }
      }
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

const resetBoard = () => {
  const size = Number(document.querySelector('#sizeSliderValue').textContent);
  generateBoard(size);
};
const sizeSliderButton = document.querySelector('#sizeSliderButton');
sizeSliderButton.addEventListener('click', resetBoard);

// tools
const tools = document.querySelectorAll('#pen, #eraser');
const resetActiveTool = () => {
  Array.from(tools).forEach((tool) => tool.classList.remove('active'));
};
Array.from(tools).forEach((tool) => {
  tool.addEventListener('click', (e) => {
    setActiveToolState(e.currentTarget.value);
    resetActiveTool();
    tool.classList.add('active');
  });
});

const resetButton = document.querySelector('#clear');
resetButton.addEventListener('click', resetBoard);

// pen color controller
let penColor = document.querySelector('#penColor').value;
const getPenColor = () => penColor;
const setPenColor = (value) => (penColor = value);
const penColorController = document.querySelector('#penColor');
penColorController.addEventListener('input', (e) => {
  // console.log(e.target.value);
  setPenColor(e.target.value);
});
