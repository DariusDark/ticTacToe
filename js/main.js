const area = document.getElementById('area');
const currentPlayer = document.getElementById('currPlayer');
const statisticArea = document.getElementById('statstic');
const controlButton = document.getElementById('ctrlButton');
const cell = document.getElementsByClassName('cell');

let player = "x";

const winCombo = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

for (let i = 1; i <= 9; i++) {
    let divCell = document.createElement('div');
    divCell.classList.add('cell');
    divCell.dataset.pos = i;

    area.appendChild(divCell);
}

controlButton.addEventListener('click', function (event) {
    for (let i = 0; i < cell.length; i++) {
        cell[i].addEventListener('click', cellClick);
    }
    area.classList.remove('inactive');

    if (this.textContent !== 'restart') {
        this.classList.add('button--blue');
        this.textContent = 'restart';
    } else {
        if (statisticArea.classList.contains('active')) {
            statisticArea.classList.remove('active');
        }
        restart();
    }

})

function cellClick() {
    let data = [];

    if (!this.textContent) {
        this.textContent = player;
    } else {
        statisticArea.textContent = 'Ячейка занята';
        statisticArea.classList.add('active');
        setTimeout(() => {
            statisticArea.classList.remove('active');
        }, 2000)
        return;
    }

    for (let i = 0; i < cell.length; i++) {
        if (cell[i].textContent == player) {
            data.push(parseInt(cell[i].dataset.pos));
        }
    }

    if (checkWin(data)) {
        statisticArea.textContent = 'Выиграл игрок ' + player;
        statisticArea.classList.add('active');
        area.classList.add('inactive');
    } else {
        let draw = true;
        for (let i = 0; i < cell.length; i++) {
            if (cell[i].textContent == '') draw = false;
        }
        if (draw) {
            statisticArea.textContent = 'Вышла ничья';
            statisticArea.classList.add('active');
            area.classList.add('inactive');
        }
    }

    player = player == "x" ? "o" : "x";
    currentPlayer.textContent = player.toUpperCase();

}

function checkWin(data) {
    for (let i = 0; i < winCombo.length; i++) {
        let win = true;
        for (let j = 0; j < winCombo[i].length; j++) {
            let id = winCombo[i][j];
            let result = data.indexOf(id);
            if (result == -1) {
                win = false;
            }
        }

        if (win) return true;
    }
    return false;
}


function restart() {
    for (let i = 0; i < cell.length; i++) {
        cell[i].textContent = '';
    }
    player = 'x';
    currentPlayer.textContent = player.toUpperCase();
}