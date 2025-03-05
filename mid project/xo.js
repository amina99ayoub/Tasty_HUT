var board;
var playerO = "O";
var playerX = "X";
var currPlayer = playerO;
var gameOver = false;

// Initialize the game when the page loads
window.onload = function() {
    setGame();
};

function setGame() {
    // Create a 3x3 board
    board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];

    gameOver = false;
    currPlayer = playerO;

    let boardDiv = document.getElementById("board");
    boardDiv.innerHTML = ""; // Clear the board

    // Create tiles for the board
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            let tile = document.createElement("div");
            tile.id = `${r}-${c}`;
            tile.classList.add("tile");

            // Add borders to create a grid
            if (r == 0 || r == 1) {
                tile.classList.add("horizontal-line");
            }
            if (c == 0 || c == 1) {
                tile.classList.add("vertical-line");
            }

            tile.innerText = ""; // Initialize as empty
            tile.addEventListener("click", setTile);
            boardDiv.appendChild(tile);
        }
    }
}

function setTile() {
    if (gameOver) return; // Prevent actions if the game is over

    let [r, c] = this.id.split("-").map(Number); // Get row and column from tile ID

    if (board[r][c] != ' ') return; // Ignore clicks on occupied tiles

    // Update the board and tile with the current player's symbol
    board[r][c] = currPlayer;
    this.innerText = currPlayer;

    // Switch to the next player
    currPlayer = currPlayer === playerO ? playerX : playerO;

    checkWinner();
}

function checkWinner() {
    // Check rows for a win
    for (let r = 0; r < 3; r++) {
        if (board[r][0] === board[r][1] && board[r][1] === board[r][2] && board[r][0] != ' ') {
            announceWinner(board[r][0]);
            highlightWinner([`${r}-0`, `${r}-1`, `${r}-2`]);
            return;
        }
    }

    // Check columns for a win
    for (let c = 0; c < 3; c++) {
        if (board[0][c] === board[1][c] && board[1][c] === board[2][c] && board[0][c] != ' ') {
            announceWinner(board[0][c]);
            highlightWinner([`0-${c}`, `1-${c}`, `2-${c}`]);
            return;
        }
    }

    // Check diagonals for a win
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] != ' ') {
        announceWinner(board[0][0]);
        highlightWinner(["0-0", "1-1", "2-2"]);
        return;
    }

    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] != ' ') {
        announceWinner(board[0][2]);
        highlightWinner(["0-2", "1-1", "2-0"]);
        return;
    }

    // Check for a tie
    if (board.flat().every(cell => cell != ' ')) {
        announceWinner("Tie");
    }
}

function highlightWinner(tiles) {
    tiles.forEach(id => {
        document.getElementById(id).classList.add("winner");
    });
    gameOver = true;
}

function announceWinner(winner) {
    let message = winner === "Tie" ? "It's a Tie!" : `Player ${winner} Wins!`;
    setTimeout(() => {
        alert(message);
        setGame(); // Reset the game
    }, 500);
}
