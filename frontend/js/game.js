const board = document.getElementById("board");
const squares = document.getElementsByClassName("square");
const squareSize = 3;
const diagonalElements = [0, 4, 8];
const diagonalElements2 = [2, 4, 6];
const gameInfo = document.getElementById("state");

const pieces = ["X", "O"];
let currentPiece = pieces[0];
let currentIndex = 0;

for (const square of squares) {
    square.addEventListener('click', handleButtonClick);
}

function handleButtonClick(event) {
    let currentTouchedSquare = event.target;

    if (currentTouchedSquare.innerHTML == "") {
        event.target.innerHTML = currentPiece;
        let element = event.target;
        let childIndex = Array.from(element.parentNode.children).indexOf(element);
        if (checkIfWon(childIndex)) {
            gameInfo.innerHTML = `${currentPiece} won`;
            for (const square of squares) {
                square.removeEventListener('click', handleButtonClick);
            }
        }
        currentIndex = (currentIndex + 1) % 2;
        currentPiece = pieces[currentIndex];
    }
    else {
        console.error("Bad User");
    }
}

function checkIfWon(index) {

    //Check Horizontal rule
    var isHorizontalWon = true;
    const startIndex = index - (index % squareSize);

    for (let i = 0; i < squareSize; i++) {
        if (squares[startIndex + i].innerHTML != squares[index].innerHTML) {
            isHorizontalWon = false;
            break;
        }
    }

    //Check vertical rule
    var isVerticalWon = true;
    const columnNumber = Math.floor(index / squareSize);
    const startVerticalIndex = index - (columnNumber) * squareSize;

    for (let i = 0; i < squareSize; i++) {
        if (squares[startVerticalIndex + (squareSize * i)].innerHTML != squares[index].innerHTML) {
            isVerticalWon = false;
            break;
        }
    }

    let isDiagonolWon = true;

    if (diagonalElements.indexOf(index) != -1) {
        for (let i = 0; i < squareSize; i++) {
            if (squares[diagonalElements[i]].innerHTML != squares[index].innerHTML) {
                isDiagonolWon = false;
                break;
            }
        }
    }
    else {
        isDiagonolWon = false;
    }

    let isDiagonol2Won = true;

    if (diagonalElements2.indexOf(index) != -1) {
        for (let i = 0; i < squareSize; i++) {
            if (squares[diagonalElements2[i]].innerHTML != squares[index].innerHTML) {
                isDiagonol2Won = false;
                break;
            }
        }
    }
    else {
        isDiagonol2Won = false;
    }

    return isHorizontalWon || isVerticalWon || isDiagonolWon || isDiagonol2Won;
}

function restartButton() {
    currentIndex = 0;
    currentPiece = pieces[0];
    for (const square of squares) {
        square.innerHTML = "";
        square.addEventListener('click', handleButtonClick);
    }
}
