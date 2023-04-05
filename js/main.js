const cells = document.querySelectorAll('.squares')
const gameCells = ['', '', '', '', '', '', '', '', '']
const board = document.getElementById('play-area')
// const restart = document.getElementById('restart')
let infoDisplay = document.getElementById('info')
const square = document.querySelector('.square-buttons')


const vsCPU = document.getElementById('vs-cpu')
const vsPlayer = document.getElementById('vs-player')
// infoDisplay = document.innerHTML = 'X turn'

let currentPlayer = 'cross'
let newPlayer = 'circle'
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

    // oButton.classList.remove('mark-style')

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
    checkWin()
}

function setHoverState(mark) {
    square.classList.remove('circle');

    square.classList.remove('cross');

    if (mark == 'cross'){
        square.classList.add('circle')
    }
    else{
        square.classList.add('cross')
    }
    // switch (mark) {
    //     case 'cross':
    //         square.classList.add(mark)
    //         break;
    //     case 'circle':
    //         square.classList.add(mark)
    //         break;
    // }

}

function reset() {
    const restart = document.getElementById('restart')
    restart.addEventListener('click', () => {
        console.log('heyyyyyyyyyyy')
    })

}


// check winning combination
const checkWin = () => {
    let winCombo = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]
    winCombo.forEach(combo => {
        const crossWins = combo.every(index =>
            cells[index].firstChild?.classList.contains('cross'))

        if (crossWins) {
            console.log('cross Wins')
            return
        }

    })
    winCombo.forEach(combo => {
        const circleWins = combo.every(index =>
            cells[index].firstChild?.classList.contains('circle'))
        if (circleWins) {

            console.log('circle Wins')
            return
        }
    })

    endGame(false)
}
// const toggleSelection = (e) => {
//     const o = document.getElementById('O-mark')
//     const x = document.getElementById('X-mark')
//     console.log(x)
//     switch (newPlayer) {
//         case 'X_CLASS':
//             player1 = newPlayer;
//             x.classList.add(newPlayer)
//             console.log(player1)
//             break;
//         case 'O_CLASS':
//             currentPlayer = 'circle'
//             o.classList.add(currentPlayer)
//             player1 = currentPlayer;
//     }


// }
function endGame(draw) {


}


function reset() {
    const restart = document.getElementById('restart')
    restart.addEventListener('click', () => {
        game
    })

}


function main() {
    // toggleSelection()
    getBoard()
    getVersus()
    reset()
    changeMark()
    setHoverState()
}

main()