const cells = document.querySelectorAll('.squares')
const gameCells = ['', '', '', '', '', '', '', '', '']
const board = document.getElementById('play-area')
const quit = document.getElementById('quit')
const infoDisplay = document.getElementById('info')
const square = document.querySelector('.square-buttons')
const notice = document.querySelector('.winning-notice')
const winningText = document.querySelector('.winning-text')
const container = document.getElementById('winning-container')
const resetContainer = document.getElementById('reset-container')
const player1 = document.querySelector('.you-score')
const player2 = document.querySelector('.cpu-score')
const roundMark = document.getElementById('round-mark')
const xWins = document.querySelector('.x-score')
const oWins = document.querySelector('.o-score')
const tiesScore = document.querySelector('.tie-score')
const vsCPU = document.getElementById('vs-cpu')
const vsPlayer = document.getElementById('vs-player')
const newRound = document.getElementById('next-round')
const restart = document.getElementById('restart-game')
const markImg = document.createElement('img')
const circlemark = document.querySelector('.circlemark')
const crossmark = document.querySelector('.crossmark')
let xWinCount = 0
let oWinCount = 0
let tieCount = 0
let roundCount = 1

let p1 = 'o'
let p2 = 'o'

const player = new Object
let opponent
currentPlayer = 'cross'
player.playerOne = 'circle'
player.playerTwo = 'cross'
player.computer = 'cross'

let winCombo = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]
let vsComputer = true
let gameover = false



// Function to get Game board
function getBoard() {
    for (let i = 0; i < cells.length; i++) {
        let btn = cells[i]
        btn.id = i;
        btn.addEventListener('click', addTick)
    }
}

// New game function
function getVersus() {
    vsCPU.addEventListener('click', () => {
        document.getElementById('new-game-menu').style.display = 'none';
        document.getElementById('board').style.display = 'block';
        vsComputer = true
        opponent = 'computer'
        changeMark()
        startGameWithCPU(player, opponent)
    })
    vsPlayer.addEventListener('click', () => {
        document.getElementById('new-game-menu').style.display = 'none';
        document.getElementById('board').style.display = 'block'
        vsComputer = false
        opponent = 'playerTwo'
        changeMark()
        startGame(player, opponent)
    })
}
// function to change mark from X to O
function changeMark() {
    const xButton = document.getElementById('x-mark-style')
    const oButton = document.getElementById('o-mark-style')
    xButton.addEventListener('click', () => {
        xButton.classList.add('mark-style')
        document.querySelector('svg').style.fill = 'var(--dark-navy)'
        document.querySelector('#o').style.fill = 'var(--silver)'
        oButton.classList.remove('mark-style')
        player.playerOne = 'cross'
        player.playerTwo = 'circle'
        player.computer = 'circle'
        currentPlayer = 'cross'

    })
    oButton.addEventListener('click', () => {
        oButton.classList.add('mark-style')
        document.querySelector('#o').style.fill = 'var(--dark-navy)'
        document.querySelector('#x').style.fill = 'var(--silver)'
        xButton.classList.remove('mark-style')
        currentPlayer = 'cross'
        player.playerOne = 'circle'
        player.playerTwo = 'cross'
        player.computer = 'circle'
    })

}

function addTick(e) {
    const cell = e.target
    setHoverState(currentPlayer)
    switch (currentPlayer) {
        case 'cross':
            cell.classList.add('x-active')
            const xMark = document.createElement('img')
            xMark.classList.add(currentPlayer)
            xMark.id = ('mark')
            xMark.src = './assets/icon-x.svg';
            e.target.appendChild(xMark)
            break;
        case 'circle':
            cell.classList.add('o-active')
            const oMark = document.createElement('img')
            oMark.classList.add(currentPlayer)
            oMark.id = ('mark')
            oMark.src = './assets/icon-o.svg';
            e.target.appendChild(oMark)
            break
    }

    if (checkWin(currentPlayer)) {
        endGame(false)
        showWinMessage(currentPlayer)
        // gameover = true
    }
    else if (isDraw()) {
        endGame(true)
        // gameover = true
    }
    else {
        currentPlayer = currentPlayer === player.playerTwo ? player.playerOne : player.playerTwo
        turn(currentPlayer)
    }
    if (currentPlayer == 'circle') {
        circlemark.style.display = 'block'
        crossmark.style.display = 'none'
    }
    if (currentPlayer == 'cross') {
        crossmark.style.display = 'block'
        circlemark.style.display = 'none'
    }
    cell.removeEventListener('click', addTick)

}

// //  who goes next
function turn(currentPlayer) {
    if (vsComputer && currentPlayer === 'cross') {
        setTimeout(aiMove, 500);
    }
    else if (vsComputer && currentPlayer === 'circle') {
        getBoard()
        setTimeout(aiMove, 500);
    }
}

// // Hover States function
function setHoverState(mark) {
    square.classList.remove('circle');
    square.classList.remove('cross');

    if (mark == 'cross') {
        square.classList.add('circle')
    }
    else {
        square.classList.add('cross')
    }
}
// // restart function
function resetBoard() {
    const restartBoard = document.getElementById('restart-board')
    restartBoard.addEventListener('click', () => {
        resetContainer.classList.add('show')
    })

}

function restartBoard() {
    restart.addEventListener('click', () => {
        resetContainer.classList.remove('show')

        cells.forEach(cell => {
            if (cell.firstChild) {
                cell.removeChild(cell.firstChild)
                // startGame()
            }
            cell.classList.remove('o-active')
            cell.classList.remove('x-active')
        })
        if (vsComputer) {
            startGameWithCPU()
        }
        else {
            startGame()
        }

    })
}

function cancelRestart() {
    const cancelButton = document.getElementById('cancel')
    cancelButton.addEventListener('click', () => {
        resetContainer.classList.remove('show')
    })
}


// check draw
function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains('x-active') || cell.classList.contains('o-active')
    })
}


function checkWin(player) {
    for (const combo of winCombo) {
        let won = true;
        for (const index of combo) {
            won = cells[index].firstChild?.classList.contains(player) && won;
        }
        if (won) {
            return true; // Return true if a win is found
        }
    }
    return false; // Return false if no win is found
}

function showWinMessage(player) {
    container.classList.add('show');
    markImg.src = player === 'circle' ? './assets/icon-o.svg' : './assets/icon-x.svg';
    roundMark.appendChild(markImg);
    winningText.style.color = player === 'circle' ? 'var(--light-yellow)' : 'var(--light-blue)';

    if (player == 'circle' && p1 === 'o' || player === 'cross' && p1 === 'x') {
        notice.innerText = player1.innerHTML.includes('YOU') ? 'YOU WIN' : 'PLAYER 1 WINS';
        if (player == 'circle') {
            oWinCount++;
            oWins.innerHTML = oWinCount;
        } else {
            xWinCount++;
            xWins.innerHTML = xWinCount;
        }
        return true
    } else if (player == 'circle' && p2 === 'o' || player == 'cross' && p2 === 'x') {
        notice.innerText = player2.innerHTML.includes('CPU') ? 'OH NO, YOU LOST' : 'PLAYER 2 WINS';
        if (player === 'circle') {
            oWinCount++;
            oWins.innerHTML = oWinCount;
        } else {
            xWinCount++;
            xWins.innerHTML = xWinCount;
        }
        return true
    }

    return true;
}


// // choose mark function
function toggleSelection() {
    if (player.playerOne === 'cross') {

        p1 = 'x'
        p2 = 'o'
        player1.innerHTML = 'X (P1)'
        player2.innerHTML = 'O (P2)'
    }
    if (player.playerOne == 'circle') {
        p1 = 'o'
        p2 = 'x'
        player1.innerHTML = 'X (P2)'
        player2.innerHTML = 'O (P1)'
    }
}


function toggleSelectionVsCPU() {
    if (player.playerOne === 'cross') {
        p1 = 'x'
        p2 = 'o'
        player1.innerHTML = 'X (YOU)';
        player2.innerHTML = 'O (CPU)';
    }
    if (player.playerOne == 'circle') {
        p1 = 'o'
        p2 = 'x'
        player1.innerHTML = 'X (CPU)';
        player2.innerHTML = 'O (YOU)';
    }
}

// // Check if its draw else check win 
function endGame(draw) {
    if (draw) {
        container.classList.add('show')
        winningText.style.color = 'var(--silver)';
        notice.innerHTML = ''
        winningText.innerText = 'round tied'
        tieCount++
        tiesScore.innerHTML = tieCount
        gameover = true
    }
    // else {
    //     // showWinMessage(player)
    // }
    cells.forEach(cell => cell.removeEventListener('click', addTick))
}

// // Next Round
function nextRound() {
    newRound.addEventListener('click', () => {
        container.classList.remove('show')
        roundMark.replaceChildren()
        cells.forEach(cell => {
            cell.classList.remove('o-active')
            cell.classList.remove('x-active')
            let firstChild = cell.firstChild
            if (firstChild) {
                cell.removeChild(firstChild)
                cell.classList.remove('o-active')
                cell.classList.remove('x-active')
            }
            updateRound()
            if (vsComputer) {
                startGameWithCPU()
            }
            else {
                startGame()
            }
        })

    })
}

function updateRound() {
    roundCount++
}

// // Quit game
function quitRound() {
    quit.addEventListener('click', () => {
        xWins.innerHTML = 0
        oWins.innerHTML = 0
        tiesScore.innerHTML = 0
        roundCount = 0
        roundMark.replaceChildren()
        container.classList.remove('show')
        document.getElementById('new-game-menu').style.display = 'block';
        document.getElementById('board').style.display = 'none';
        cells.forEach(cell => {
            if (cell.firstChild) {
                let firstChild = cell.firstChild
                if (firstChild) {
                    cell.removeChild(firstChild)
                    cell.classList.remove('o-active')
                    cell.classList.remove('x-active')
                }
            }
            currentPlayer = 'cross'
            resetScore()
        })
    })
    if (vsComputer) {
        // startGameWithCPU()
    }
    else {
        startGame()
    }
}
// // Reset score to zero
function resetScore() {
    xWinCount = 0
    oWinCount = 0
    tieCount = 0

    xWins.innerHTML = xWinCount
    oWins.innerHTML = oWinCount
    tiesScore.innerHTML = tieCount
}

function bestSpot() {
    return minimax(player.computer).id
}


function aiMove() {
    setHoverState(currentPlayer)
    const emptyCells = getEmptySpace()
    // const index = Math.floor(Math.random() * emptyCells.length)
    const bestMove = getBestMove(currentPlayer, emptyCells)
    // const index = bestSpot()
    const cell = emptyCells[bestMove.index]
    console.log(bestMove)
    switch (currentPlayer) {
        case 'cross':
            // if current player is X, append X immage as child 
            cell.classList.add('x-active')
            const xMark = document.createElement('img')
            xMark.classList.add('cross')
            xMark.id = ('mark')
            xMark.src = './assets/icon-x.svg';
            cell.appendChild(xMark)
            break;
        case 'circle':
            // if current player is O, append O immage as child 
            cell.classList.add('o-active')
            const oMark = document.createElement('img')
            oMark.classList.add('circle')
            oMark.id = ('mark')
            oMark.src = './assets/icon-o.svg';
            cell.appendChild(oMark)
            break;
    }
    if (checkWin(player.computer)) {
        showWinMessage(player.computer)
        endGame(false)
        // gameover = true
    }
    else if (isDraw()) {
        endGame(true)
        // gameover = true
    }
    else {
        currentPlayer = currentPlayer === player.computer ? player.playerOne : player.computer
        // turn(currentPlayer)
    }
    // currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle'
    if (currentPlayer == 'circle') {
        circlemark.style.display = 'block'
        crossmark.style.display = 'none'
    }
    if (currentPlayer == 'cross') {
        crossmark.style.display = 'block'
        circlemark.style.display = 'none'
    }

    cell.removeEventListener('click', addTick)
}


// function getBestMove(player, emptyCells,alpha = -Infinity, beta = Infinity) {
//     let bestScore = player === 'cross' ? -Infinity : Infinity;
//     let bestIndex = -1;

//     for (let i = 0; i < emptyCells.length; i++) {
//         const cell = emptyCells[i];
//         // const index = parseInt(i)


//         // Simulate the move
//         cell.classList.add(`${player}-active`);
//         const mark = document.createElement('img');
//         mark.classList.add(player);
//         mark.id = 'mark';
//         mark.src = player === 'cross' ? './assets/icon-x.svg' : './assets/icon-o.svg';
//         cell.appendChild(mark);

//         // Calculate the score using the minimax algorithm
//         const score = minimax(player === 'cross' ? 'circle' : 'cross', false, alpha, beta);

//         cell.classList.remove(`${player}-active`);
//         cell.removeChild(mark);

//         if (
//             (player === 'cross' && score > bestScore) ||
//             (player === 'circle' && score < bestScore)
//         ) {
//             bestScore = score;
//             bestIndex = i;
//         }
//         if (player === 'cross') {
//             alpha = Math.max(alpha, bestScore);
//         } else {
//             beta = Math.min(beta, bestScore);
//         }

//         if (beta <= alpha) {
//             break;
//         }

//     }

//     return { index: bestIndex, score: bestScore };
// }


// function minimax(PLAYER, isMaximizing, depth) {
//     let emptyCells = getEmptySpace()

//     if (checkWin(player.playerOne)) {
//         return -depth + 1
//     }
//     else if (checkWin(player.computer)) {
//         return depth -1
//     }
//     if (emptyCells == 0) {
//         return 0
//     }

//     let bestScore = isMaximizing ? -Infinity : Infinity;
//     // let emptyCells = [...cells].filter((cell) => !cell.firstChild);

//     for (let i = 0; i < emptyCells.length; i++) {

//         const cell = emptyCells[i];
//         cell.classList.add(`${PLAYER}-active`);
//         const mark = document.createElement('img');
//         mark.classList.add(PLAYER);
//         mark.id = 'mark';
//         mark.src = PLAYER === 'cross' ? './assets/icon-x.svg' : './assets/icon-o.svg';
//         cell.append(mark);
//         const score = minimax(PLAYER === 'cross' ? 'circle' : 'cross', !isMaximizing);

//         cell.classList.remove(`${PLAYER}-active`);
//         cell.removeChild(mark);

//         if (isMaximizing) {
//             bestScore = Math.max(score, bestScore);
//         }
//         else {
//             bestScore = Math.min(score, bestScore);
//         }
//     }

//     return bestScore
// }

function getBestMove(player, emptyCells, alpha = -Infinity, beta = Infinity) {
    let bestScore = player === 'cross' ? -Infinity : Infinity;
    let bestIndex = -1;

    // Iterative deepening with increasing depth
    for (let depth = 1; depth <= emptyCells.length; depth++) {
        const result = minimax(player, true, depth, alpha, beta);

        if (player === 'cross' && result.score > bestScore) {
            bestScore = result.score;
            bestIndex = result.index;
        } else if (player === 'circle' && result.score < bestScore) {
            bestScore = result.score;
            bestIndex = result.index;
        }
    }

    return { index: bestIndex, score: bestScore };
}

function minimax(player, isMaximizingPlayer, depth, alpha, beta) {
    const emptyCells = getEmptySpace()
    // Base case: evaluate the score if the maximum depth is reached or the game is over
    // if (depth === 0 || checkWin(player) || checkWin(player === 'cross' ? 'circle' : 'cross') || isDraw()) {
    //     return {score :evaluateScore(player, depth)}
    // }
    if (depth == 0 || checkWin('cross') || checkWin('circle') || isDraw()) {
        return { score: evaluateScore(player, depth) }
    }

    let bestScore = isMaximizingPlayer ? -Infinity : Infinity;
    let bestIndex = -1;

    for (let i = 0; i < emptyCells.length; i++) {
        const cell = emptyCells[i];

        // Simulate the move
        cell.classList.add(`${player}-active`);
        const mark = document.createElement('img');
        mark.classList.add(player);
        mark.id = 'mark';
        mark.src = player === 'cross' ? './assets/icon-x.svg' : './assets/icon-o.svg';
        cell.appendChild(mark);

        // Recursive call to the minimax function
        const result = minimax(player === 'cross' ? 'circle' : 'cross', !isMaximizingPlayer, depth - 1, alpha, beta);

        cell.classList.remove(`${player}-active`);
        cell.removeChild(mark);

        if (isMaximizingPlayer) {
            // Update the best score and index for the maximizing player
            if (result.score > bestScore) {
                bestScore = result.score;
                bestIndex = i;
            }
            alpha = Math.max(alpha, bestScore);
        } else {
            // Update the best score and index for the minimizing player
            if (result.score < bestScore) {
                bestScore = result.score;
                bestIndex = i;
            }
            beta = Math.min(beta, bestScore);
        }

        // Apply alpha-beta pruning
        if (beta <= alpha) {
            break;
        }
    }

    return { index: bestIndex, score: bestScore };
}

function evaluateScore(player, depth) {
    const emptyCells = getEmptySpace()
    // Provide a heuristic evaluation score based on the game state and depth
    if (checkWin(player)) {
        return depth + 1; // Adjust the score based on depth to favor winning earlier
    } else if (checkWin(player === 'cross' ? 'circle' : 'cross')) {
        return -depth - 1; // Adjust the score based on depth to favor losing later
    } else if (isDraw()) {
        return 0; // The game is a draw
    } else {
        // Neither player has won yet, so we need to estimate the score based on the number of empty cells remaining
        const emptyCellScore = emptyCells.length / 9;
        return player === 'cross' ? emptyCellScore : -emptyCellScore;
    }
    // if(checkWin('circle')){
    //     return depth+1
    // }
    // else if(checkWin('circle')){
    //     return -depth -1
    // }
    // else if(emptyCells.length==0){
    //     return 0
    // }
}



function getEmptySpace() {
    let EMPTY = [];
    [...cells].filter(cell => {
        if (!cell.firstChild) {
            EMPTY.push(cell)
        }
    })
    return EMPTY
}

function startGameWithCPU() {
    currentPlayer = player.playerOne
    vsComputer = true
    toggleSelectionVsCPU()
    switch (currentPlayer) {
        case 'cross':
            currentPlayer = 'cross'
            setHoverState()
            getBoard();

            break;
        case 'circle':
            currentPlayer = 'cross'
            setHoverState()
            getBoard();

            turn(currentPlayer)
            break;
    }

}

// function startGameWithCPU() {
//     if (gameover) return;

//     vsComputer = true;
//     toggleSelectionVsCPU();

//     currentPlayer = 'cross';
//     setHoverState(currentPlayer);
//     getBoard();

//     if (currentPlayer === player.computer) {
//       // Computer's turn
//       setTimeout(aiMove, 500);
//     } else {
//       // Player's turn
//       cells.forEach(cell => {
//         cell.addEventListener('click', addTick);
//       });
//     }
//   }




function startGame(player) {
    currentPlayer = 'cross'
    vsComputer = false
    toggleSelection()
    getBoard()

}
function main() {
    getVersus()
    changeMark()
    setHoverState()
    nextRound()
    resetBoard()
    quitRound()
    cancelRestart()
    restartBoard()
}

main()
