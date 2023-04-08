const cells = document.querySelectorAll('.squares')
const gameCells = ['', '', '', '', '', '', '', '', '']
const board = document.getElementById('play-area')
// const restart = document.getElementById('restart')
let infoDisplay = document.getElementById('info')
const square = document.querySelector('.square-buttons')
const notice = document.querySelector('.winning-notice')
const container = document.getElementById('winning-container')
const player1 = document.querySelector('.you')
const player2 = document.querySelector('.cpu')
const roundMark = document.getElementById('round-mark')

const vsCPU = document.getElementById('vs-cpu')
const vsPlayer = document.getElementById('vs-player')
// infoDisplay = document.innerHTML = 'X turn'

let currentPlayer = 'cross'
let p1 = 'o'
let p2 = 'x'
player1.innerHTML = 'X (P2)'
player2.innerHTML = 'O (P1)'
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
        document.getElementById('board').style.display = 'block'
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

    // Remove event Listener on squares
    e.target.removeEventListener('click', addTick)
    checkWin(p1, p2)
}

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

function reset() {
    const restart = document.getElementById('restart')
    restart.addEventListener('click', () => {
        console.log('heyyyyyyyyyyy')
    })

}
function getPlayer() {
    return toggleSelection()

}

function crossWins() {
    getPlayer()
    console.log(p1)
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
                console.log('x wins')
                return
            }
            if (p2 == 'x') {
                container.classList.add('show')
                markImg = document.createElement('img')
                markImg.src = './assets/icon-x.svg'
                notice.innerText = 'PLAYER 2 WINS'
                roundMark.appendChild(markImg)
                console.log('x wins')
            }
        }
    })
}
function circleWins() {
    getPlayer()
    console.log(p2)
    winCombo.forEach(combo => {
        const circleWins = combo.every(index =>
            cells[index].firstChild?.classList.contains('circle'))
        if (circleWins) {
            if (p1 == 'o') {
                container.classList.add('show')
                markImg = document.createElement('img')
                markImg.src = './assets/icon-o.svg'
                roundMark.appendChild(markImg)
                notice.innerText = `Player 1 wins`
                return
            }
            if (p2 == 'o') {
                container.classList.add('show')
                markImg = document.createElement('img')
                markImg.src = './assets/icon-o.svg'
                roundMark.appendChild(markImg)
                notice.innerText = 'Player 2 WINS'
                console.log('o wins')
                return
            }
        }
    })
}
// check winning combination
const checkWin = () => {
    crossWins()
    circleWins()
    endGame(false)
}


// choose mark function
const toggleSelection = () => {
    const o = document.getElementById('o-mark-style')
    const x = document.getElementById('x-mark-style')
    // player1 = o.className

    o.addEventListener('click', () => {
        p1 = 'o'
        p2 = 'x'
        player1.innerHTML = 'X (P2)'
        player2.innerHTML = 'O (P1)'
    })

    x.addEventListener('click', () => {
        p1 = 'x'
        p2 = 'o'
        player1.innerHTML = 'X (P1)'
        player2.innerHTML = 'O (P2)'
    })

}
const toggleSelectionVsCPU = (player) => {
    const o = document.getElementById('o-mark-style')
    const x = document.getElementById('x-mark-style')
    player = o.className

    o.addEventListener('click', () => {
        player = 'o'
        p2 = 'x'
        player1.innerHTML = 'X (CPU)'
        player2.innerHTML = 'O (P1)'
    })

    x.addEventListener('click', () => {
        player = 'x'
        p2 = 'o'
        player1.innerHTML = 'X (P1)'
        player2.innerHTML = 'O (CPU)'
    })

}
function endGame(draw) {


}

// function reset() {
//     const restart = document.getElementById('restart')
//     restart.addEventListener('click', () => {
//         game
//     })

// }


function main() {
    toggleSelection()
    toggleSelectionVsCPU()
    getBoard()
    getVersus()
    reset()
    changeMark()
    setHoverState()
}

main()