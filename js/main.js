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
const  markImg = document.createElement('img')
// infoDisplay = document.innerHTML = 'X turn'
let xWinCount = 0
let oWinCount = 0
let tieCount = 0
let roundCount = 1
let currentPlayer = 'cross'
let p1 = 'o'
let p2 = 'x'
player1.innerText = 'X (P2)'
player2.innerText = 'O (P1)'
let winCombo = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]
let score = document.querySelector('.score')





// Function to get Game board
function getBoard(_cell, index) {
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
        toggleSelectionVsCPU()
        // startGame()
    })

    vsPlayer.addEventListener('click', () => {
        document.getElementById('new-game-menu').style.display = 'none';
        document.getElementById('board').style.display = 'block'
        toggleSelection()
        // startGame()
    })
}
// function to change mark from X to O
function changeMark(e) {
    const xButton = document.getElementById('x-mark-style')
    const oButton = document.getElementById('o-mark-style')
    xButton.addEventListener('click', () => {
        xButton.classList.add('mark-style')
        document.querySelector('svg').style.fill = 'var(--dark-navy)'
        document.querySelector('#o').style.fill = 'var(--silver)'
        oButton.classList.remove('mark-style')
    })
    oButton.addEventListener('click', () => {
        oButton.classList.add('mark-style')
        document.querySelector('#o').style.fill = 'var(--dark-navy)'
        document.querySelector('#x').style.fill = 'var(--silver)'
        xButton.classList.remove('mark-style')
    })

}
function addTick(e) {
    setHoverState(currentPlayer)
    const cell = e.target
    switch (currentPlayer) {
        case 'cross':
            // if current player is X, append X immage as child 
            cell.classList.add('x-active')
            const xMark = document.createElement('img')
            xMark.classList.add(currentPlayer)
            xMark.id = ('mark')
            xMark.src = './assets/icon-x.svg';
            e.target.appendChild(xMark)
            break;

        case 'circle':
            // if current player is O, append O immage as child 
            cell.classList.add('o-active')
            const oMark = document.createElement('img')
            oMark.classList.add(currentPlayer)
            oMark.id = ('mark')
            oMark.src = './assets/icon-o.svg';
            e.target.appendChild(oMark)
            break;
    }

    // if O mark is true, return X mark else return O mark and assign it to mark
    currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';

    infoDisplay.innerHTML = `${currentPlayer} turn`


    // if(currentPlayer=='circle'){
    //     const currentPlayerMark = document.createElement('img')
    //     currentPlayerMark.src = './assets/icon-o-outline.svg'
    //     currentPlayerMark.style.fill = 'var(--silver)'
    //     currentPlayerMark.style.width = '16px'
    //     currentPlayerMark.style.height = '16px'
    //     infoModal.appendChild(currentPlayerMark)
    //     infoDisplay.innerHTML = ` turn`
    // }
    // else if(currentPlayer == 'cross'){
    //     const currentPlayerMark = document.createElement('img')
    //     currentPlayerMark.src = './assets/icon-x-outline.svg'
    //     currentPlayerMark.style.fill = 'var(--silver)'
    //     currentPlayerMark.style.width = '16px'
    //     currentPlayerMark.style.height = '16px'
    //     infoModal.appendChild(currentPlayerMark)
    //     infoDisplay.innerHTML = ` turn`
    // }


    // Remove event Listener on squares
    e.target.removeEventListener('click', addTick)
    checkDraw()

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
// restart function
function resetBoard() {
    const restartBoard = document.getElementById('restart-board')
    restartBoard.addEventListener('click', () => {
        resetContainer.classList.add('show')
    })

}


function restartBoard() {
    restart.addEventListener('click', () => {
        resetContainer.classList.remove('show')
        cells.forEach(cell=>{
            if(cell.firstChild){
                // markImg.parentNode.removeChild()
                cell.replaceChildren()
                startGame()
            }
            else{
                console.log('no first child')
            }
            // cell.classList.remove('o-active')
        })
      
    })
}
function cancelRestart() {
    const cancelButton = document.getElementById('cancel')
    cancelButton.addEventListener('click', () => {
        resetContainer.classList.remove('show')
    })    
}
function getPlayer() {
    return toggleSelection()
}

function crossWins() {
    getPlayer()
    winCombo.forEach(combo => {
        const crossWins = combo.every(index =>
            cells[index].firstChild?.classList.contains('cross'))
        if (crossWins) {
            if (p1 == 'x') {
                container.classList.add('show')
                const markImg = document.createElement('img')
                markImg.src = './assets/icon-x.svg'
                roundMark.appendChild(markImg)
                notice.innerText = 'PLAYER 1 WINS'
                xWinCount++
                xWins.innerHTML = xWinCount
                return
            }
            if (p2 == 'x') {
                container.classList.add('show')
                const markImg = document.createElement('img')
                markImg.src = './assets/icon-x.svg'
                roundMark.appendChild(markImg)
                notice.innerText = 'PLAYER 2 WINS'
                xWinCount++
                xWins.innerHTML = xWinCount
                return
            }
        }
    })
}
function circleWins() {
    getPlayer()
    winCombo.forEach(combo => {
        const circleWins = combo.every(index =>
            cells[index].firstChild?.classList.contains('circle'))
        if (circleWins) {
        //    const  markImg = document.createElement('img')
            markImg.src = './assets/icon-o.svg'
            roundMark.appendChild(markImg)
            if (p1 == 'o') {
                container.classList.add('show')
                // markImg = document.createElement('img')
                // markImg.src = './assets/icon-o.svg'
                // roundMark.appendChild(markImg)
                notice.innerText = `PLAYER 1 WINS`
                winningText.style.color = 'var(--light-yellow)'
                oWinCount = oWinCount + 1
                oWins.innerHTML = oWinCount
                return
            }
            if (p2 == 'o') {
                container.classList.add('show')
                // markImg = document.createElement('img')
                // markImg.src = './assets/icon-o.svg'
                // roundMark.appendChild(markImg)
                notice.innerText = 'PLAYER 2 WINS'
                winningText.style.color = 'var(--light-yellow)'
                oWinCount = oWinCount + 1
                oWins.innerHTML = oWinCount
                return
            }
        }
    })
}

// check draw
function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains('x-active') || cell.classList.contains('o-active')
    })
}

// check winning combination
const checkWin = () => {
    crossWins()
    circleWins()
}


function checkDraw() {
    if (checkWin()) {
        endGame(false)
    }
    else if (isDraw()) {
        endGame(true)
    }
    // console.log('check draw')
}

// choose mark function
function toggleSelection() {
    const o = document.getElementById('x-mark-style')
    const x = document.getElementById('x-mark-style')

    o.addEventListener('click', () => {
        p1 = 'o'
        p2 = 'x'
        player1.innerHTML = 'X (P2)'
        player2.innerHTML = 'O (P1)'
        oWins.innerHTML = '0'
    })

    x.addEventListener('click', () => {
        p1 = 'x'
        p2 = 'o'
        player1.innerHTML = 'X (P1)'
        player2.innerHTML = 'O (P2)'
        xWins.innerHTML = '0'
    })

}


function toggleSelectionVsCPU() {
    const o = document.getElementById('o-mark-style')
    const x = document.getElementById('x-mark-style')


    o.addEventListener('click', () => {
        p1 = 'o'
        p2 = 'x'
        player1.innerHTML = 'X (CPU)'
        player2.innerHTML = 'O (P1)'
        xWins.innerText = '0'
    })

    x.addEventListener('click', () => {
        p1 = 'x'
        p2 = 'o'
        player1.innerHTML = 'X (P1)'
        player2.innerHTML = 'O (CPU)'
        oWins.innerText = '0'
    })

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
    else{
        console.log('win')
    }
}

function nextRound() {
    newRound.addEventListener('click', () => { 
        roundMark.replaceChildren()
        container.classList.remove('show')
        cells.forEach(cell => {
            if(cell.firstChild){
                cell.replaceChildren()
                startGame()
            }
            else{
                startGame()
            }
            // cell.classList.remove('o-active')
            currentPlayer = 'cross'
            cell.replaceChildren()
            updateRound()
        })
        startGame()
    })
}

function updateRound() {
    roundCount++
}


function quitRound() {
    quit.addEventListener('click', () => {
        container.classList.remove('show')
        document.getElementById('new-game-menu').style.display = 'block';
        document.getElementById('board').style.display = 'none';
        cells.forEach(cell => {
            cell.replaceChildren()
        })
        startGame()
    })
    // startGame()
}

function main() {
    toggleSelection()
    toggleSelectionVsCPU()
    getVersus()
    changeMark()
    getBoard()
    setHoverState()
    checkDraw()
    nextRound()
    resetBoard()
    quitRound()
    cancelRestart()
    restartBoard()
}

main()

function startGame() {
    currentPlayer = 'cross'
    cells.forEach(cell => {

        cell.addEventListener('click', main())
    })
}