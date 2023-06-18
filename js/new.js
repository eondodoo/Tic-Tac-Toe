const cells = document.querySelectorAll('.squares')
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

let p1 = 'x'
let p2 = 'o'

const player = new Object
let opponent
// currentPlayer = player.playerTwo
player.playerOne = 'circle'
player.playerTwo = 'cross'
player.computer = 'cross'

let gameData = new Array(9)

// currentPlayer = player.playerOne
currentPlayer = 'cross'
let winCombo = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]


function getVersus() {
    vsCPU.addEventListener('click', () => {
        document.getElementById('new-game-menu').style.display = 'none';
        document.getElementById('board').style.display = 'block';
        vsComputer = true
        opponent = 'computer'
        changeMark()
        startGameVsCPU()
    })
    vsPlayer.addEventListener('click', () => {
        document.getElementById('new-game-menu').style.display = 'none';
        document.getElementById('board').style.display = 'block'
        vsComputer = false
        opponent = 'playerTwo'
        changeMark()
        startGame()
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
        player.playerOne = 'circle'
        player.playerTwo = 'cross'
        player.computer = 'circle'
        currentPlayer = 'circle'
    })

}
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


function getBoard() {
    for (let i = 0; i < cells.length; i++) {
        let cell = cells[i]
        cell.id = i;
        cell.addEventListener('click', addMove)
    }

}

function addMove(e) {
    let cell = e.target
    setHoverState(currentPlayer)
    gameData[cell.id] = currentPlayer
    drawImage(currentPlayer, cell)


    if (checkWin(gameData, currentPlayer)) {
        endGame(false)
        showWinMessage(currentPlayer)
        return
    }
    else if (isDraw(gameData)) {
        endGame(true)
        return
    }
    else {
        currentPlayer = currentPlayer == player.playerTwo ? player.playerOne : player.playerTwo
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
    cell.removeEventListener('click', addMove)
}


function turn(currentPlayer) {
    if (vsComputer && currentPlayer === 'cross') {
        setTimeout(aiMove, 500);
        
    }
    else if (vsComputer && currentPlayer === 'circle') {
        getBoard()
        setTimeout(aiMove, 500);
    }
}

function bestSpot() {
    return minimax(gameData, player.computer).id
}



function getEmptySpace(gameData) {
    let EMPTY = [];
    for (let id = 0; id < gameData.length; id++) {
        if (!gameData[id]) {
            EMPTY.push(id)
        }
    }

    return EMPTY
}

function aiMove() {
    let id = minimax(gameData, player.computer).id

    let cell = document.getElementById(id)
    gameData[id] = currentPlayer

    drawImage(currentPlayer, cell)

    if (checkWin(gameData, player.computer)) {
        endGame(false)
        showWinMessage(player.computer)
        return
    }
    else if (isDraw(gameData)) {
        endGame(true)
        return
    }
    else {
        currentPlayer = currentPlayer == player.computer ? player.playerOne : player.computer
    }
    cell.removeEventListener('click', addMove)
}

function minimax(gameData, PLAYER) {
    var emptyCells = getEmptySpace(gameData)

    if (checkWin(gameData, player.playerOne)) {
        return { score: -10 };
    } else if (checkWin(gameData, player.computer)) {
        return { score: 10 };
    } else if (isDraw(gameData)) {
        return { score: 0 };
    }

    let moves = [];


    for (let i = 0; i < emptyCells.length; i++) {

        let id = emptyCells[i]

        let defaultBoard = gameData[id]

        gameData[id] = PLAYER

        let move = {};
        move.id = id;
        if (PLAYER === player.computer) {
            move.score = minimax(gameData, player.playerOne).score;
        } else {
            move.score = minimax(gameData, player.computer).score;
        }

        gameData[id] = defaultBoard
        moves.push(move)

    }

    var bestMove;
    if (PLAYER === player.computer) {
        var bestScore = -Infinity;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = moves[i];
            }
        }
    } else {
        var bestScore = Infinity;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = moves[i];
            }
        }
    }

    return bestMove;
}

function drawImage(player, cell) {
    const xImage = new Image()
    xImage.src = './assets/icon-x.svg'

    const oImage = new Image()
    oImage.src = './assets/icon-o.svg'
    switch (player) {
        case 'cross':
            cell.classList.add('x-active')
            xImage.classList.add(player)
            xImage.id = ('mark')
            cell.appendChild(xImage)
            break;
        case 'circle':
            cell.classList.add('o-active')
            oImage.classList.add(player)
            oImage.id = ('mark')
            cell.appendChild(oImage)
            break
    }
}

// Hover States function

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
                startGameVsCPU(currentPlayer)
            }
            else {
                startGame(currentPlayer)
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


function isDraw(gameData) {
    let boardFull = true
    // return [...cells].every(cell => {
    //     return cell.classList.contains('x-active') || cell.classList.contains('o-active')
    // })
    for (let i = 0; i < gameData.length; i++) {
        boardFull = gameData[i] && boardFull
    }
    if (boardFull) {
        return true
    }
    return false
}

function checkWin(gameData, player) {
    for (let i = 0; i < winCombo.length; i++) {
        let won = true;
        for (let j = 0; j < winCombo[i].length; j++) {
            if (gameData[winCombo[i][j]] !== player) {
                won = false;
                break;
            }
        }
        if (won) {
            return true;
        }
    }
    return false;
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


function endGame(draw) {
    if (draw) {
        container.classList.add('show')
        winningText.style.color = 'var(--silver)';
        notice.innerHTML = ''
        winningText.innerText = 'round tied'
        tieCount++
        tiesScore.innerHTML = tieCount
    }
    cells.forEach(cell => cell.removeEventListener('click', addMove))
}


function startGameVsCPU() {
    vsComputer = true
    toggleSelectionVsCPU()
    switch (currentPlayer) {
        case 'cross':
            setHoverState(currentPlayer)
            currentPlayer = 'cross'
            getBoard();
          break;
        case 'circle':
          currentPlayer = 'cross';
          setHoverState(currentPlayer);
          getBoard();
          turn(currentPlayer);
          break;
      }
      
}
// function startGameVsCPU() {
  
//     vsComputer = true
//     toggleSelectionVsCPU()
//     if(currentPlayer == 'cross'){
//         aiMove()
//     }
//     else if(currentPlayer=='circle'){
//         console.log(player.computer)
//     }

// }
function startGame() {
    vsComputer = false
    // currentPlayer = 'cross'
    toggleSelection()
    getBoard()
}


changeMark()
getBoard()
getVersus()
nextRound()