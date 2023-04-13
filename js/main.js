const cells = document.querySelectorAll('.squares')
const gameCells = ['', '', '', '', '', '', '', '', '']
const board = document.getElementById('play-area')
const quit = document.getElementById('quit')
let infoDisplay = document.getElementById('info')
let infoModal = document.getElementById('info-modal')
const square = document.querySelector('.square-buttons')
const notice = document.querySelector('.winning-notice')
const winningText = document.querySelector('.winning-text')
const container = document.getElementById('winning-container')
const player1 = document.querySelector('.you-score')
const player2 = document.querySelector('.cpu-score')
const roundMark = document.getElementById('round-mark')
const xWins = document.querySelector('.x-score')
const oWins = document.querySelector('.o-score')
const tiesScore = document.querySelector('.tie-score')
const vsCPU = document.getElementById('vs-cpu')
const vsPlayer = document.getElementById('vs-player')
const newRound = document.getElementById('next-round')
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
    })

    vsPlayer.addEventListener('click', () => {
        document.getElementById('new-game-menu').style.display = 'none';
        document.getElementById('board').style.display = 'block'
        toggleSelection()
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
    // console.log([...cells].forEach(cell => cell.className))
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
function reset() {
    const restart = document.getElementById('restart')
    restart.addEventListener('click', () => {
        cells.forEach(cell => {
            container.classList.add('show')
            notice.innerHTML = ''
            winningText.innerHTML = 'Restart Game'
            // winningText.style.color = 'var(--silver)'
            // newRound.innerHTML = 'Yes, restart'
            // quit.style.width = '139px'
            // quit.innerHTML = 'No, Cancel'
            currentPlayer = 'cross'
            cell.replaceChildren()
            

        })
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
                markImg = document.createElement('img')
                markImg.src = './assets/icon-x.svg'
                notice.innerText = 'PLAYER 1 WINS'
                roundMark.appendChild(markImg)
                xWinCount++
                xWins.innerHTML = xWinCount
                return
            }
            if (p2 == 'x') {
                container.classList.add('show')
                markImg = document.createElement('img')
                markImg.src = './assets/icon-x.svg'
                notice.innerText = 'PLAYER 2 WINS'
                roundMark.appendChild(markImg)
                xWinCount++
                xWins.innerHTML = xWinCount
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
            // updateScore
            // oWinCount++
            // oWins = oWinCount
            if (p1 == 'o') {
                container.classList.add('show')
                markImg = document.createElement('img')
                markImg.src = './assets/icon-o.svg'
                roundMark.appendChild(markImg)
                notice.innerText = `PLAYER 1 WINS`
                winningText.style.color = 'var(--light-yellow)'
                oWinCount = oWinCount + 1
                oWins.innerHTML = oWinCount
                return
            }
            if (p2 == 'o') {
                container.classList.add('show')
                markImg = document.createElement('img')
                markImg.src = './assets/icon-o.svg'
                roundMark.appendChild(markImg)
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
    return [...cells].every(cell =>{
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
        updateScore()
        endGame(false)
    }
    else if (isDraw()) {
        winningText.style.color = 'var(--silver)';
        winningText.innerText = 'round tied'
        tieCount++
        tiesScore.innerHTML = tieCount
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
    }
    else {
        console.log('win')
    }
}

function nextRound() {
    newRound.addEventListener('click', () => {
        cells.forEach(cell => {
            currentPlayer = 'x'
            cell.replaceChildren()
            container.classList.remove('show')
            updateRound()
            getBoard()
        })
        console.log('round 2')
    })
}

function updateRound() {
    roundCount++
}
function updateScore() {
    if (checkWin()) {
        if(circleWins()){
            console.log('circle heeyy')
        }
        else if(crossWins()){
            console.log('x heyyy')
        }
    }
    // else if (crossWins()) {
    //     xWinCount = xWinCount + 1
    //     xWins.innerHTML = xWinCount
    //     console.log(xWinCount)
    // }
    else {
        // tieCount = tieCount + 1
        tiesScore.innerHTML = tieCount
        // console.log(tieCount)
    }
}

function quitRound() {
    quit.addEventListener('click', () => {
        container.classList.remove('show')
        document.getElementById('new-game-menu').style.display = 'block';
        document.getElementById('board').style.display = 'none';
        cells.forEach(cell => {
            cell.replaceChildren()
            xWinCount.innerHTML = 0
            oWinCount.innerHTML = 0
            tieCount.innerHTML = 0
            roundCount.innerHTML = 0
            startGame()
        })
    })
}

function main() {
    toggleSelection()
    toggleSelectionVsCPU()
    getBoard()
    getVersus()
    changeMark()
    nextRound()
    reset()
}

main()

function startGame() {
    currentPlayer = 'cross'
    getBoard()
    setHoverState()
    reset()
    checkDraw()
    updateScore()

    quitRound()
}
/*
handlte clivk

1. add tick
2. check win
3. check draw
4. hover
*/