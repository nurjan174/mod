const board = document.getElementById("board");

function createBoard() {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      if ((row + col) % 2 === 0) {
        cell.classList.add("white");
      } else {
        cell.classList.add("black");

        if (row < 3) {
          const piece = document.createElement("div");
          piece.classList.add("piece", "red");
          cell.appendChild(piece);
        } else if (row > 4) {
          const piece = document.createElement("div");
          piece.classList.add("piece", "blue");
          cell.appendChild(piece);
        }
      }

      board.appendChild(cell);
    }
  }
}

createBoard();
const params = new URLSearchParams(window.location.search);
const room = params.get("room");

if (!room) {
  const inviteCode = Math.random().toString(36).substring(2, 8);
  const inviteUrl = ${location.origin}${location.pathname}?room=${inviteCode};
  alert("Скопируй ссылку и отправь другу: " + inviteUrl);
}function botMove() {
  const jumps = [];
  const moves = [];

  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (state[y][x] === 'red') {
        for (let dx of [-1, 1]) {
          let nx = x + dx;
          let ny = y + 1;
          if (isValidMove(x, y, nx, ny)) {
            moves.push({ from: [x, y], to: [nx, ny] });
          }
          // check jump
          let jx = x + dx * 2;
          let jy = y + 2;
          if (isValidMove(x, y, jx, jy)) {
            jumps.push({ from: [x, y], to: [jx, jy] });
          }
        }
      }
    }
  }

  const move = jumps.length > 0
    ? jumps[Math.floor(Math.random() * jumps.length)]
    : moves[Math.floor(Math.random() * moves.length)];

  if (move) {
    movePiece(...move.from, ...move.to);
    turn = 'blue';
    render();
  }
}
