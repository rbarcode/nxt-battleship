const gameBoard = [
  ['', '', '', '', 'Y', '', '', '', '', '', '', ''],
  ['', '', '', 'J', 'O', 'D', 'I', '', '', '', '', ''],
  ['', '', 'A', '', 'N', '', '', '', 'R', '', 'A', ''],
  ['', 'T', 'A', 'R', 'I', 'Q', '', 'M', 'I', 'K', 'E', ''],
  ['', '', 'R', '', '', '', '', '', 'C', '', 'S', ''],
  ['', 'T', 'O', 'M', '', '', 'M', '', 'H', '', 'A', ''],
  ['', '', 'N', 'O', 'E', 'T', 'I', 'C', 'A', '', '', ''],
  ['', '', '', 'N', '', '', 'C', '', 'R', '', '', ''],
  ['', '', '', 'T', '', '', 'H', '', 'D', '', '', ''],
  ['', '', '', 'Y', '', 'D', 'A', 'N', '', 'A', '', ''],
  ['', '', '', '', '', '', 'E', '', '', 'V', '', ''],
  ['', '', '', '', '', 'O', 'L', 'I', 'V', 'I', 'A', '']
];

// set grid/board size                  
const rows = 12;
const cols = 12;
const cellSize = 50;

let gameOver = false;

// get the container element
var gameBoardContainer = document.getElementById("gameboard");

// make the grid columns and rows
for (i = 0; i < cols; i++) {
  for (j = 0; j < rows; j++) {

    // create a new div HTML element for each grid cell and size it correctly
    const cell = document.createElement("div");

    // give each cell a unique id
    // standardize ids to 2 digits per row/column   
    let rowId;
    let colId;
    if (j < 10) {
      rowId = `0${j}`;
    } else {
      rowId = j;
    }
    if (i < 10) {
      colId = `0${i}`;
    } else {
      colId = i;
    }
    cell.id = 'c' + rowId + colId;
    cell.setAttribute("id", cell.id);

    gameBoardContainer.appendChild(cell);

    // set each cell's coords: multiples of current row or column number
    const topPosition = j * cellSize;
    const leftPosition = i * cellSize;

    // use CSS absolute positioning to place each grid cell on the page
    cell.style.top = topPosition + 'px';
    cell.style.left = leftPosition + 'px';
  }
}


// display starting word 'NOETICA'
function displaySeedWord() {
  const seedWord = 'NOETICA';
  const offset = 2;
  for (i = 0; i < seedWord.length; i++) {
    let pos;
    if (i + 2 < 10) {
      pos = `0${i + 2}`
    } else {
      pos = `${i + 2}`
    }
    let seedWordCell = document.getElementById('c06' + pos);
    seedWordCell.innerHTML = gameBoard[6][i + offset];
    seedWordCell.style.background = 'white';
  }
}

displaySeedWord();


// various game counters...

// used to set winning condition
let correctGuessCount = 0;

// used to set losing condition
let wrongGuessCount = 7;

// column offset of seed word
// used to visually track wrong guess count
// a cell of the seed word turns red per wrong guess
let wrongGuessTracker = 2;


gameBoardContainer.addEventListener("click", revealCell);

function revealCell(e) {
  if (gameOver === false) {
    // if item clicked (e.target) is not the parent element on which the event listener was set (e.currentTarget)
    if (e.target !== e.currentTarget) {
      // extract row and column # from the HTML element's id
      let stringRow = e.target.id.substring(1, 3);
      let stringCol = e.target.id.substring(3, 5);

      // convert id back to array index
      let row;
      let col;
      if (stringRow[0] === '0') {
        row = stringRow.substring(1, 2);
      } else {
        row = stringRow;
      }
      if (stringCol[0] === '0') {
        col = stringCol.substring(1, 2);
      } else {
        col = stringCol;
      }
      // console.log(`row: ${row}, col: ${col}`);


      if (e.target.style.background === 'silver' || e.target.style.background === 'red' || e.target.style.background === 'white') {
        // if player clicks on a seed word cell or a cell that was already clicked,
        // do nothing
        // console.log(e.target.style.background);
      } else if (gameBoard[row][col] == '') {
        // if player clicks on a cell with no letter, change the color to silver 
        // and update game counters
        e.target.style.background = 'silver';
        let trackerCell = document.getElementById(`c060${wrongGuessTracker}`);
        trackerCell.style.background = 'red';
        wrongGuessTracker++;
        wrongGuessCount--;
        if (wrongGuessCount === 0) {
          gameOver = true;
          alert("You've used up all your guesses. You lose!")
        }
      } else if (gameBoard[row][col] !== '') {
        // if a player clicks on a cell with a letter, change the color to white,
        // update HTML to display letter and update game counters
        e.target.innerHTML = gameBoard[row][col];
        e.target.style.background = 'white';
        correctGuessCount++;
        if (correctGuessCount === 46) {
          gameOver = true;
          alert("You win!");
        }
      }
    }
    e.stopPropagation();
  }
}