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

let gameData = new Array(9)

const player = new Object
let opponent

let currentPlayer = 'cross'

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
        startGameWithCPU()
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
        currentPlayer = 'cross'
        player.playerOne = 'circle'
        player.playerTwo = 'cross'
        player.computer = 'circle'
    })

}

function addTick(e) {
    const cell = e.target
    setHoverState(currentPlayer)
    gameData[cell.id] = currentPlayer
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

    if (checkWin(gameData, currentPlayer)) {
        endGame(false)
        showWinMessage(currentPlayer)
        // gameover = true
    }
    else if (isDraw(gameData)) {
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
    if (vsComputer && currentPlayer == 'circle') {
        setTimeout(aiMove, 500)
    }
    else if (vsComputer && currentPlayer == 'cross') {
        getBoard()
        setTimeout(aiMove, 500)
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
function isDraw(gameData) {
    let boardFull = true
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
        notice.innerText = player2.innerHTML.includes('YOU') ? 'OH NO, YOU LOST' : 'PLAYER 2 WINS';
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
        gameData = new Array(9)
        container.classList.remove('show')
        roundMark.replaceChildren()
        cells.forEach(cell => {
            let firstChild = cell.firstChild
            if (firstChild) {
                cell.removeChild(firstChild)
                cell.classList.remove('o-active')
                cell.classList.remove('x-active')
            }

        })
        updateRound()
        if (vsComputer) {
            startGameWithCPU()
        }
        else {
            startGame()
        }

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
    return minimax(gameData, player.computer)
}


function aiMove() {
    setHoverState(currentPlayer)
    const bestMove = bestSpot()
    const cell = document.getElementById(bestMove.id)
    gameData[bestMove.id] = currentPlayer

    console.log(cell)
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
    if (checkWin(gameData, player.computer)) {
        showWinMessage(player.computer)
        endGame(false)
        // gameover = true
    }
    else if (isDraw(gameData)) {
        endGame(true)
        // gameover = true
    }
    else {
        currentPlayer = currentPlayer === player.computer ? player.playerOne : player.computer
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

function minimax(gameData, PLAYER) {
    var emptyCells = getEmptySpace(gameData)

    if (checkWin(gameData, player.playerOne)) {
        return { score: -1 };
    }
    else if (checkWin(gameData, player.computer)) {
        return { score: 1 };
    }
    else if (isDraw(gameData)) {
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


function getEmptySpace(gameData) {
    let EMPTY = [];
    for (let id = 0; id < gameData.length; id++) {
        if (!gameData[id]) {
            EMPTY.push(id)
        }
    }

    return EMPTY
}



function startGameWithCPU() {
    vsComputer = true;
    toggleSelectionVsCPU();
    // console.log('1', player.playerOne)
    // console.log('2', player.computer)
    currentPlayer = player.playerOne

    if (currentPlayer === 'cross') {
        setHoverState(currentPlayer)
        getBoard()
    }
    else if (currentPlayer === 'circle') {
        currentPlayer = 'cross'
        setHoverState(currentPlayer)
        turn(currentPlayer)
    }

}


function startGame() {
    currentPlayer = 'cross'
    setHoverState(currentPlayer)
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
