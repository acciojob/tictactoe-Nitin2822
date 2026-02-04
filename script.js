const submitBtn = document.getElementById('submit');
const messageDiv = document.querySelector('.message');
const cells = document.querySelectorAll('.cell');
let p1, p2;
let currentPlayer;
let isP1Turn = true;
let gameActive = true;

submitBtn.addEventListener('click', () => {
    p1 = document.getElementById('player-1').value || "Player 1";
    p2 = document.getElementById('player-2').value || "Player 2";
    currentPlayer = p1;
    
    document.getElementById('setup').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    messageDiv.innerText = `${currentPlayer}, you're up`;
});

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (cell.innerText === "" && gameActive) {
            const mark = isP1Turn ? 'x' : 'o';
            cell.innerText = mark;
            
            if (checkWin()) {
                messageDiv.innerText = `${currentPlayer} congratulations you won!`;
                gameActive = false;
                return;
            }

            // Switch Players
            isP1Turn = !isP1Turn;
            currentPlayer = isP1Turn ? p1 : p2;
            messageDiv.innerText = `${currentPlayer}, you're up`;
        }
    });
});

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return cells[a].innerText !== "" &&
               cells[a].innerText === cells[b].innerText &&
               cells[a].innerText === cells[c].innerText;
    });
}