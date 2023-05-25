
// const human = document.querySelector('.you-score')
// const computer = document.querySelector('.cpu-score')
// computer.innerHTML = 'X (CPU)'
// human.innerHTML = 'O (P1)'
let hum = 'x'
let com = 'o'
// Function to get Game board
function getBoard(_cell, index) {
    for (let i = 0; i < cells.length; i++) {
        let btn = cells[i]
        btn.id = i;
        btn.addEventListener('click', handleClick)
    }
}

function getVersus() {
    vsCPU.addEventListener('click', () => {
        document.getElementById('new-game-menu').style.display = 'none';
        document.getElementById('board').style.display = 'block';
        toggleSelectionVsCPU()
        startVsAi()
    })
}

function toggleSelectionVsCPU() {
    // computer.innerHTML = 'X (CPU)'
    // human.innerHTML = 'O (P1)'
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
function handleClick(e) {
    makeMove(e.target)
}
function addMark(cell) {
    currentPlayer = 'cross'
    cell.removeEventListener('click', handleClick);
    if (aiMove()) {
        endGame(false)

    }
    else if (isDraw()) {
        endGame(true)
    }
    else {
        currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
        aiMove()
    }
}

function aiMove() {
    setHoverState(currentPlayer)
    const emptyCells = Array.from(cells).filter(cell => {
        return !cell.firstChild
    })
    var cell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
    switch (currentPlayer) {
        case 'cross':
            // if current player is X, append X image as child 
            // randomCell.classList.add('x-active')
            const xMark = document.createElement('img')
            xMark.classList.add(currentPlayer)
            xMark.id = ('mark')
            xMark.src = './assets/icon-x.svg';
            cell.appendChild(xMark)
            break;

        case 'circle':
            // if current player is O, append O image as child 
            // randomCell.classList.add('o-active')
            const oMark = document.createElement('img')
            oMark.classList.add(currentPlayer)
            oMark.id = ('mark')
            oMark.src = './assets/icon-o.svg';
            cell.appendChild(oMark)
            break;
    }
    addMark(cell)
}


// start game

function startVsAi() {
    currentPlayer = 'cross'
    if (toggleSelectionVsCPU) {
        if (p1 == 'x') {
            humanMove()
            aiMove()
        }
        if (p1 == 'o') {
            aiMove()
            humanMove()
        }

    }
    currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
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

// function startGame() {


// }


function getPlayer() {
    return toggleSelectionVsCPU()
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
    else {
        // checkWin()
    }
}

function nextRound() {
    newRound.addEventListener('click', () => {
        container.classList.remove('show')
        roundMark.replaceChildren()
        cells.forEach(cell => {
            let firstChild = cell.firstChild
            if (firstChild) {
                cell.removeChild(firstChild)
                cell.classList.remove('o-active')
                cell.classList.remove('x-active')
            }
            currentPlayer = 'cross'
            infoDisplay.innerHTML = `${currentPlayer} turn`
            updateRound()
            // startGame()
        })

    })
}

function updateRound() {
    roundCount++
}

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
            // cell.innerHTML = ''
            if (cell.firstChild) {
                let firstChild = cell.firstChild
                if (firstChild) {
                    cell.removeChild(firstChild)
                }
            }
            currentPlayer = 'cross'
            resetScore()
        })

    })
    // startGame()
}
function resetScore() {
    xWinCount = 0
    oWinCount = 0
    tieCount = 0

    xWins.innerHTML = xWinCount
    oWins.innerHTML = oWinCount
    tiesScore.innerHTML = tieCount
}

startVsAi()
addMark()
getBoard()
getVersus()
toggleSelectionVsCPU()