  document.addEventListener('DOMContentLoaded', () => {
            // Game state variables
            let currentPlayer = 'X';
            let gameBoard = ['', '', '', '', '', '', '', '', ''];
            let gameActive = true;
            let scores = {
                'X': 0,
                'O': 0
            };
            
            // Winning combinations
            const winPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
                [0, 4, 8], [2, 4, 6]             // Diagonals
            ];
            
            // DOM elements
            const statusDisplay = document.getElementById('status');
            const cells = document.querySelectorAll('.cell');
            const restartButton = document.getElementById('restart-btn');
            const xScoreDisplay = document.getElementById('x-score');
            const oScoreDisplay = document.getElementById('o-score');
            
            // Functions
            function handleCellClick(e) {
                const clickedCell = e.target;
                const cellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
                
                // Check if cell is already taken or game is not active
                if (gameBoard[cellIndex] !== '' || !gameActive) {
                    return;
                }
                
                // Update game state and UI
                gameBoard[cellIndex] = currentPlayer;
                clickedCell.textContent = currentPlayer;
                clickedCell.classList.add(currentPlayer.toLowerCase());
                
                // Check for win or draw
                if (checkWin()) {
                    endGame(false);
                } else if (isDraw()) {
                    endGame(true);
                } else {
                    // Switch player
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
                }
            }
            
            function checkWin() {
                for (let i = 0; i < winPatterns.length; i++) {
                    const [a, b, c] = winPatterns[i];
                    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                        // Highlight winning cells
                        cells[a].classList.add('win');
                        cells[b].classList.add('win');
                        cells[c].classList.add('win');
                        return true;
                    }
                }
                return false;
            }
            
            function isDraw() {
                return !gameBoard.includes('');
            }
            
            function endGame(isDraw) {
                gameActive = false;
                
                if (isDraw) {
                    statusDisplay.textContent = "Game ended in a draw!";
                } else {
                    statusDisplay.textContent = `Player ${currentPlayer} wins!`;
                    scores[currentPlayer]++;
                    updateScoreboard();
                }
            }
            
            function updateScoreboard() {
                xScoreDisplay.textContent = scores['X'];
                oScoreDisplay.textContent = scores['O'];
            }
            
            function restartGame() {
                currentPlayer = 'X';
                gameBoard = ['', '', '', '', '', '', '', '', ''];
                gameActive = true;
                statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
                
                cells.forEach(cell => {
                    cell.textContent = '';
                    cell.classList.remove('x', 'o', 'win');
                });
            }
            
            // Event listeners
            cells.forEach(cell => {
                cell.addEventListener('click', handleCellClick);
            });
            
            restartButton.addEventListener('click', restartGame);
        });