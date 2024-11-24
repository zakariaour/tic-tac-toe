const board = document.getElementById('game-board');
const statusText = document.getElementById('game-status');
const currentPlayerText = document.getElementById('current-player');
const resetButton = document.getElementById('reset-button');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', '']; 
let gameActive = true;

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], 
  [0, 3, 6], [1, 4, 7], [2, 5, 8], 
  [0, 4, 8], [2, 4, 6]             
];

function createBoard() {
  board.innerHTML = '';
  gameState.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.dataset.index = index; 
    cellElement.addEventListener('click', handleCellClick);
    board.appendChild(cellElement);
  });
}

function handleCellClick(event) {
  const index = event.target.dataset.index;

  if (gameState[index] !== '' || !gameActive) return;

  gameState[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `🎉 Le joueur ${currentPlayer} a gagné !`;
    gameActive = false;
    return;
  }

  if (!gameState.includes('')) {
    statusText.textContent = "🤝 C'est une égalité !";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  currentPlayerText.textContent = currentPlayer;
}

function checkWin() {
  return winningCombinations.some(combination => {
    return combination.every(index => gameState[index] === currentPlayer);
  });
}

resetButton.addEventListener('click', resetGame);

function resetGame() {
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayerText.textContent = currentPlayer;
  statusText.textContent = 'Tour de : X';
  createBoard();
}

createBoard();
