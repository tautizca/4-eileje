const ROWS=6, COLS=7;
const boardDiv = document.getElementById('board');
const statusDiv = document.getElementById('status');
let gameOver, board, currentPlayer;

init();

function init() {
    board = Array.from({length:ROWS}, () => Array(COLS).fill(0));
    currentPlayer = 1; // 1 - Geltona, 2 - Raudona
    drawBoard();
    updateStatus();
}

function drawBoard() {
    boardDiv.innerHTML = '';
    for(let r = 0; r < ROWS; r++){
        for(let c = 0; c < COLS; c++){
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');

            if(board[r][c] === 1) { cellDiv.classList.add('player1') };
            if(board[r][c] === 2) { cellDiv.classList.add('player2') };

            cellDiv.addEventListener('click', () => handleMove(c));

            boardDiv.appendChild(cellDiv);
        }
    }
}

function updateStatus() {
    statusDiv.textContent = currentPlayer === 1 ? '1 (Geltona)' : '2 (Raudona)'
}

function handleMove(col) {
    if (gameOver) return;
    // Žaidėjo veiksmas
    // Žaidėjas pasirenka stulpelį, į kurį nori įmesti žetoną.
    for (let row = ROWS-1; row > 0; row--) {
        // Patikrinama, ar stulpelis nėra pilnas.
        if(board[row][col] === 0) {
            board[row][col] = currentPlayer;
            // Nustatom ar zaidejas laimejo ?
            if (checkWin(row, col)) {
                gameOver = true;
                statusDiv.innerText = `Laimejo ${currentPlayer} zaidejas !!!`;
            } else {
                currentPlayer = currentPlayer === 1 ? 2 : 1;
                updateStatus();
            }
            drawBoard();

            return;
        }
    }
    
    return;
}

   /* --- Pergalės tikrinimas --- */
    function checkWin(r,c) {
      return (
        countDir(r,c,0,1)  >=4 || // horizontaliai
        countDir(r,c,1,0)  >=4 || // vertikaliai
        countDir(r,c,1,1)  >=4 || // įstrižai "\"
        countDir(r,c,1,-1) >=4    // įstrižai "/"
      );
    }
    // Skaičiuojame, kiek diskų iš eilės abiem kryptimis (dx,dy) ir (-dx,-dy)
    function countDir(r,c,dr,dc) {
      const player=board[r][c];
      let count=1;
      // pirmyn
      for (let i=1;i<4;i++) {
        const nr=r+dr*i, nc=c+dc*i;
        if (nr<0||nr>=ROWS||nc<0||nc>=COLS||board[nr][nc]!==player) break;
        count++;
      }
      // atgal
      for (let i=1;i<4;i++) {
        const nr=r-dr*i, nc=c-dc*i;
        if (nr<0||nr>=ROWS||nc<0||nc>=COLS||board[nr][nc]!==player) break;
        count++;
      }

      return count;
    }

    document.getElementById('new-game').addEventListener('click', init);