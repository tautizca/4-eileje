    /* --- Pagrindiniai nustatymai --- */
    const ROWS=6, COLS=7;
    const boardDiv=document.getElementById('board');
    const statusSpan=document.getElementById('currentPlayer');
    let board, currentPlayer, gameOver;

    init();               // paleidžiame žaidimą

    /* --------- Funkcijos --------- */

    // Pradinė lentos ir kintamųjų būsena
    function init() {
      board = Array.from({length:ROWS}, ()=>Array(COLS).fill(0)); // 0 – tuščia
      currentPlayer = 1;  // 1 – geltona, 2 – raudona
      gameOver = false;
      drawBoard();
      updateStatus();
    }

    // Ryški vizualizacija naršyklėje
    function drawBoard() {
      boardDiv.innerHTML='';                  // išvalome ankstesnį turinį
      for (let r=0; r<ROWS; r++) {
        for (let c=0; c<COLS; c++) {
          const cellDiv=document.createElement('div');
          cellDiv.classList.add('cell');
          if (board[r][c]===1) cellDiv.classList.add('player1');
          if (board[r][c]===2) cellDiv.classList.add('player2');
          // ant viršutinės eilutės leidžiame spausti, kad "mesti" diską
          cellDiv.addEventListener('click', ()=>handleMove(c));
          boardDiv.appendChild(cellDiv);
        }
      }
    }

    // Paspaudus stulpelį, bandome įdėti diską
    function handleMove(col) {
      if (gameOver) return;
      // randame žemiausią tuščią vietą tame stulpelyje
      for (let row=ROWS-1; row>=0; row--) {
        if (board[row][col]===0) {
          board[row][col]=currentPlayer;
          if (checkWin(row,col)) {
            gameOver = true;
            statusSpan.textContent = `Žaidėjas ${currentPlayer} laimėjo!`;
          } else if (board.flat().every(v=>v!==0)) {    // lygiosios
            gameOver = true;
            statusSpan.textContent = 'Lygiosios – lenta pilna.';
          } else {                                      // kitas žaidėjas
            currentPlayer = currentPlayer===1 ? 2 : 1;
            updateStatus();
          }
          drawBoard();      // atnaujiname vaizdą
          return;
        }
      }
      // jei stulpelis pilnas – nieko nevyksta
    }

    // Atnaujiname tekstą po ėjimo
    function updateStatus() {
      statusSpan.textContent = currentPlayer===1
        ? '1 (geltona)'
        : '2 (raudona)';
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

    // Mygtukas „Pradėti iš naujo“
    document.getElementById('new-game').addEventListener('click', init);