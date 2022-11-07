let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
const formContainer = document.getElementById("gameFormContainer");
const gameForm = document.getElementById("gameForm");
const gameOverContainer = document.getElementById("gameOverContainer");
const gameOverForm = document.getElementById("gameOverForm");
const winnerTitle = document.getElementById("winner");
const timerSection = document.getElementById("Timer");
let winnerPlayer = null;
const background = new Image();
background.src = "./../../assets/game-detail/background.png";
const player1 = {
  name: "Player 1",
  imgSrc: "./../../assets/game-detail/spaceship1.png",
};
const player2 = {
  name: "Player 2",
  imgSrc: "./../../assets/game-detail/spaceship2.png",
};

let gameSize = 4;
let turn = "player1";
let columns = 7;
let rows = 6;
let time = false;
let gameOver = false;

canvas.width = window.innerWidth;
canvas.height = (7 * window.innerHeight) / 9;

let canvas_width = canvas.width;
let canvas_height = canvas.height;

const columnWidth = 60;
const rowHeight = 60;
let columns_positions = [];
const board_top_position = rowHeight;
let player_tokens_amount = (columns * rows) / 2;
let player_1_tokens = [];
let player_2_tokens = [];

const boardMatrix = [];

gameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  handleFormSubmit();
});

const handleFormSubmit = () => {
  let data = new FormData(gameForm);
  gameSize = Number(data.get("gameSize"));
  columns = gameSize + 3;
  rows = gameSize + 2;
  let chosenName = data.get("player1Name");
  player1.name = chosenName ? chosenName : player1.name;
  player1.imgSrc = data.get("player1Image");
  player2.imgSrc = data.get("player2Image");
  chosenName = data.get("player2Name");
  player2.name = chosenName ? chosenName : player2.name;
  gameForm.classList.add("hidden");
  player_tokens_amount = (columns * rows) / 2;
  for (let c = 0; c < columns; c++) {
    let rowsInColumn = [];
    for (let r = 0; r < rows; r++) {
      rowsInColumn[r] = null;
    }
    boardMatrix[c] = rowsInColumn;
  }
  initPlayerTokens();
  canvas.addEventListener("mousedown", mouseDown);
  canvas.addEventListener("mousemove", mouseMove);
  canvas.addEventListener("mouseup", mouseUp);
  canvas.addEventListener("mouseout", mouseUp);

  canvas.classList.add("canvas");
  time = true;
  startTimer();
  let interval = setInterval(function () {
    context.clearRect(0, 0, canvas_width, canvas_height);
    if (!gameOver) {
      drawBoard();
      drawPlayerTokens();
    } else {
      //drawBoard();

      gameOverContainer.classList.remove("hidden");
      canvas.classList.remove("canvas");
      winnerTitle.innerHTML = winnerPlayer
        ? winnerPlayer.name + " Won"
        : "Time's Up";
      clearInterval(interval);
    }
  }, 10);
};

const drawCircle = (context, x, y, fillColor) => {
  context.save();
  context.globalCompositeOperation = "destination-out";
  context.beginPath();
  context.arc(x, y, rowHeight / 2 - 5, 0, 2 * Math.PI, false);
  context.fill();
  context.restore();
};
const drawBoard = () => {
  context.clearRect(0, 0, canvas_width, canvas_height);
  let x_pos = canvas_width / 2 - (columns * columnWidth) / 2;
  let y_pos = board_top_position;

  for (let c = 0; c < columns; c++) {
    context.fillStyle = "#9463ce";
    context.fillRect(x_pos, y_pos, columnWidth, rows * rowHeight);
    for (let r = 0; r < rows; r++) {
      drawCircle(
        context,
        x_pos + columnWidth / 2,
        y_pos + rowHeight / 2,
        "white"
      );
      if (boardMatrix[c][r]) {
        context.drawImage(
          boardMatrix[c][r].image,
          boardMatrix[c][r].x,
          boardMatrix[c][r].y
        );
      } else {
        drawCircle(
          context,
          x_pos + columnWidth / 2,
          y_pos + rowHeight / 2,
          "white"
        );
      }
      y_pos += rowHeight;
    }
    columns_positions.push(x_pos);
    x_pos += columnWidth;
    y_pos = board_top_position;
  }
};

const mouseUp = (event) => {
  event.preventDefault();
  let currentColumn = null;
  const click_x_pos = event.layerX;
  const click_y_pos = event.layerY;
  const valid_y_click =
    click_y_pos < board_top_position &&
    click_y_pos > board_top_position - rowHeight;
  let playedToken;
  if (turn === "player2") {
    playedToken = player_2_tokens.find((t) => t.isSelected);
    playedToken.isSelected = false;
    player_2_tokens = player_2_tokens.filter((t) => t !== playedToken);
  } else {
    playedToken = player_1_tokens.find((t) => t.isSelected);
    playedToken.isSelected = false;
    player_1_tokens = player_1_tokens.filter((t) => t !== playedToken);
  }
  for (let c = 0; c < columns; c++) {
    if (
      click_x_pos >= columns_positions[c] &&
      click_x_pos < columns_positions[c] + columnWidth &&
      valid_y_click
    ) {
      currentColumn = c;
    }
  }
  if (currentColumn === null || !valid_y_click) {
    turn === "player1"
      ? player_1_tokens.push({
          ...playedToken,
          x: playedToken.originalX,
          y: playedToken.originalY,
        })
      : player_2_tokens.push({
          ...playedToken,
          x: playedToken.originalX,
          y: playedToken.originalY,
        });
  } else {
    let currentRow = null;
    for (let r = rows - 1; r >= 0; r--) {
      if (!boardMatrix[currentColumn][r]) {
        currentRow = r;
        break;
      }
    }
    if (currentRow === null) {
      turn === "player1"
        ? player_1_tokens.push({
            ...playedToken,
            x: playedToken.originalX,
            y: playedToken.originalY,
          })
        : player_2_tokens.push({
            ...playedToken,
            x: playedToken.originalX,
            y: playedToken.original,
          });
    } else {
      turn = turn === "player2" ? "player1" : "player2";
      let x_pos =
        canvas_width / 2 -
        (columns * columnWidth) / 2 +
        columnWidth * currentColumn +
        5;
      let y_pos =
        board_top_position +
        rows * rowHeight -
        (rows - currentRow) * rowHeight +
        2.5;
      const placedToken = {
        x: x_pos,
        y: y_pos,
        image: playedToken.image,
        player: playedToken.player,
        column: currentColumn,
        row: currentRow,
      };
      boardMatrix[currentColumn][currentRow] = placedToken;
      const winner = checkWinner(
        placedToken,
        currentRow,
        currentColumn,
        gameSize
      );
      if (winner) {
        winnerPlayer = placedToken.player;

        gameOver = true;
      }
    }
  }
};

const isClicked = (token, pos) => {
  return (
    Math.sqrt(
      Math.pow(pos.x - (token.x - 25), 2) + Math.pow(pos.y - (token.y - 25), 2)
    ) < 25
  );
};
const initPlayerTokens = () => {
  let tokensToAward = (columns * rows) / 2;
  let tokensLeft = tokensToAward;
  const chipsPerCol = tokensToAward / 5;
  let player1Img = new Image();
  player1Img.src = player1.imgSrc;
  let player2Img = new Image();
  player2Img.src = player2.imgSrc;
  for (let j = 0; j < 5; j++) {
    for (let i = 0; i < chipsPerCol; i++) {
      player_1_tokens[tokensToAward - tokensLeft] = {
        token_number: tokensToAward - tokensLeft,
        x: rowHeight * j + 1.5 * columnWidth,
        originalX: rowHeight * j + 1.5 * columnWidth,
        y: i * rowHeight + rowHeight + 50,
        originalY: i * rowHeight + rowHeight + 50,
        player: player1,
        image: player1Img,
      };
      player_2_tokens[tokensToAward - tokensLeft] = {
        token_number: tokensToAward - tokensLeft,
        x: window.innerWidth - (rowHeight * j + rowHeight),
        originalX: window.innerWidth - (rowHeight * j + rowHeight),
        y: i * rowHeight + rowHeight + 50,
        originalY: i * rowHeight + rowHeight + 50,
        player: player2,
        image: player2Img,
      };
      console.log(tokensLeft);
      tokensLeft = tokensLeft - 1;
    }
  }
};
const drawPlayerTokens = () => {
  for (let token of player_1_tokens) {
    context.drawImage(
      token.image,
      token.x - token.image.width,
      token.y - token.image.height
    );
  }
  for (let token2 of player_2_tokens) {
    context.drawImage(
      token2.image,
      token2.x - token2.image.width,
      token2.y - token2.image.height
    );
  }
};
const mouseDown = (e) => {
  let clickedToken = null;
  if (turn === "player1") {
    for (let token of player_1_tokens) {
      if (isClicked(token, { x: e.layerX, y: e.layerY })) {
        clickedToken = token;
        token.isSelected = true;
      }
    }
  } else {
    for (let token of player_2_tokens) {
      if (isClicked(token, { x: e.layerX, y: e.layerY })) {
        clickedToken = token;
        token.isSelected = true;
      }
    }
  }
};
const mouseMove = (e) => {
  for (let token of player_1_tokens) {
    if (token.isSelected) {
      token.x = e.layerX + 25;
      token.y = e.layerY + 25;
    }
  }
  for (let token of player_2_tokens) {
    if (token.isSelected) {
      token.x = e.layerX + 25;
      token.y = e.layerY + 25;
    }
  }
};
const checkWinner = (token, row, col, num) => {
  return (
    checkWinnerCol(token, row, col, num) ||
    checkWinnerRow(token, row, col, num) ||
    checkWinnerDiagonalToLeft(token, row, col, num) ||
    checkWinnerDiagonalToRight(token, row, col, num)
  );
};
const checkWinnerCol = (token, row, col, num) => {
  let count = 0;
  let auxRow = row;
  while (auxRow < rows) {
    if (
      boardMatrix[col][auxRow] &&
      boardMatrix[col][auxRow].player === token.player
    ) {
      count++;
      if (count == num) {
        return true;
      }
    } else {
      count = 0;
    }
    auxRow++;
  }
};
const checkWinnerRow = (token, row, col, num) => {
  count = 0;
  let auxCol = col;
  while (
    auxCol > 0 &&
    boardMatrix[auxCol - 1][row] != null &&
    boardMatrix[auxCol - 1][row].player == token.player
  ) {
    auxCol--;
  }
  while (auxCol < columns && boardMatrix[auxCol][row] != null) {
    if (boardMatrix[auxCol][row].player == token.player) {
      count++;
      if (count == num) return true;
    } else {
      count = 0;
    }
    auxCol++;
  }
  return false;
};
const checkWinnerDiagonalToLeft = (token, row, col, num) => {
  count = 0;
  let auxCol = col;
  let auxRow = row;
  while (
    auxCol > 0 &&
    auxRow < rows - 1 &&
    boardMatrix[auxCol][auxRow] != null &&
    boardMatrix[auxCol][auxRow].player == token.player
  ) {
    auxCol--;
    auxRow++;
  }
  while (
    auxCol < columns &&
    auxRow >= 0 &&
    boardMatrix[auxCol][auxRow] != null
  ) {
    if (boardMatrix[auxCol][auxRow].player == token.player) {
      count++;
      if (count == num) return true;
    } else {
      count = 0;
    }
    auxCol++;
    auxRow--;
  }
  return false;
};
const checkWinnerDiagonalToRight = (token, row, col, num) => {
  let count = 0;
  let auxCol = col;
  let auxRow = row;

  while (
    auxCol > 0 &&
    auxRow > 0 &&
    boardMatrix[auxCol][auxRow] != null &&
    boardMatrix[auxCol][auxRow].player == token.player
  ) {
    if (
      boardMatrix[auxCol - 1][auxRow - 1] != null &&
      boardMatrix[auxCol - 1][auxRow - 1].player == token.player
    ) {
      auxCol--;
      auxRow--;
    } else {
      break;
    }
  }
  while (
    auxCol < columns &&
    auxRow < rows &&
    boardMatrix[auxCol][auxRow] != null
  ) {
    if (boardMatrix[auxCol][auxRow].player == token.player) {
      count++;
      if (count == num) return true;
    } else {
      return false;
    }
    auxCol++;
    auxRow++;
  }
};
const startTimer = () => {
  timerSection.classList.remove("hidden");
  let counterSec = document.getElementById("SecLeft");
  let sec = 59;
  let counterMin = document.getElementById("MinLeft");
  let min = gameSize === 7 ? 4 : gameSize === 6 ? 3 : 2;
  counterSec.innerText = sec;
  counterMin.innerText = min;
  let timer = setInterval(function () {
    if (!gameOver) {
      if (min > 0) {
        if (sec === 0) {
          min--;
          sec = 59;
          counterMin.innerText = min;
          counterSec.innerText = sec;
        } else {
          sec--;
          counterSec.innerText = sec;
        }
      } else {
        if (sec === 0) {
          counterMin.innerText = min;
          counterSec.innerText = sec;
          time = 0;
          gameOver = true;
          clearInterval(timer);
        } else {
          sec--;
          counterSec.innerText = sec;
        }
      }
    }
  }, 1000);
};
