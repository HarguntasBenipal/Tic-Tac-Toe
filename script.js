let player1 = true;

let positions = [
  [-1, -1, -1],
  [-1, -1, -1],
  [-1, -1, -1],
];

function reset() {
  positions = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1],
  ];

  for (let i = 1; i <= 9; i++) {
    document.getElementById(i).disabled = false;
    document.getElementById(i).innerHTML = "";
  }

  player1 = true;
  document.getElementById("player_text").innerHTML = player1
    ? "Player 1(x) turn:"
    : "Player 2(o) turn:";
}

function onWin() {
  document.getElementById("player_text").innerHTML = !player1 //the opposite of the current player is the winner (it switches, then performs)
    ? "Player 1 WON!!!:"
    : "Player 2 won!!!";
  let textArr = "gameover!".split("");

  for (let i = 0; i <= 8; i++) {
    document.getElementById(i + 1).innerHTML = textArr[i];
    document.getElementById(i + 1).disabled = true;
  }
}

function onTie() {
  document.getElementById("player_text").innerHTML = "tie!!";
  let textArr = "gameover!".split("");

  for (let i = 0; i <= 8; i++) {
    document.getElementById(i + 1).innerHTML = textArr[i];
    document.getElementById(i + 1).disabled = true;
  }
}

function calculateWin() {
  //columnIndex = left to right number
  //row index = top to bottom number

  //horizontal lines
  for (let rowIndex = 0; rowIndex < positions.length; rowIndex++) {
    let row = positions[rowIndex];
    let xCount = 0;
    let oCount = 0;
    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      if (row[columnIndex] == "x") {
        xCount++;
      } else if (row[columnIndex] == "o") {
        oCount++;
      }
    }
    if (xCount == 3 || oCount == 3) {
      onWin();
      return;
    }
  }

  //vertical lines

  for (let rowIndex = 0; rowIndex < positions.length; rowIndex++) {
    let xCount = 0;
    let oCount = 0;
    for (
      let columnIndex = 0;
      columnIndex < positions[rowIndex].length;
      columnIndex++
    ) {
      if (positions[columnIndex][rowIndex] == "x") {
        xCount++;
      } else if (positions[columnIndex][rowIndex] == "o") {
        oCount++;
      }
    }
    if (xCount == 3 || oCount == 3) {
      onWin();
      return;
    }
  }

  //diagonal lines (forgor to check for diagonal lines)

  //tie
  for (let i = 0; i < positions.length; i++) {
    for (let x = 0; x < positions[i].length; x++) {
      if (positions[x][i] == -1) {
        return;
      }
    }
  }

  onTie(); //only runs if the previous for loop doesn't detect any empty squares (tie)
}

//diagonal lines

function adjustPosition(buttonID) {
  buttonID = buttonID;
  if (
    positions[Math.ceil(buttonID / 3) - 1][
      buttonID - 3 * (Math.ceil(buttonID / 3) - 1) - 1
    ] == "x" ||
    positions[Math.ceil(buttonID / 3) - 1][
      buttonID - 3 * (Math.ceil(buttonID / 3) - 1) - 1
    ] == "o"
  ) {
    return;
  }

  document.getElementById(buttonID).innerHTML = player1 ? "x" : "o";
  positions[Math.ceil(buttonID / 3) - 1][
    buttonID - 3 * (Math.ceil(buttonID / 3) - 1) - 1
  ] = player1 ? "x" : "o";

  player1 = !player1;
  document.getElementById("player_text").innerHTML = player1
    ? "Player 1(x) turn:"
    : "Player 2(o) turn:";

  calculateWin();
}
