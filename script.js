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
