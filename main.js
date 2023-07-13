// Sync year in the footer
document.querySelector('#yearFooter').textContent = new Date().getFullYear();

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

const generateBoard = (totalLength = 64) => {
  const board = document.querySelector('#board');
  for (let i = 0; i < totalLength; i++) {
    const row = createRowOfCells(totalLength);
    board.append(row);
  }
};

generateBoard(LENGTH);
