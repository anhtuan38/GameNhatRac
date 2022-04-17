const maxRow = 12;
const maxColumn = 13;

const $ = (value) => {
  return document.getElementById(value);
};

const randomInteger = () => {
  return Math.floor(Math.random() * maxRow);
};

function Check(x, y) {
  let check = false;
  for (let i = 0; i < arrayBlack.length; i++) {
    if (arrayBlack[i].x == x && arrayBlack[i].y == y) {
      check = true;
      break;
    }
  }
  return check;
}

const root = $("root");
let indexRed = { currentX: 0, currentY: 0 };
let arrayBlack = [
  { x: randomInteger(), y: randomInteger() },
  { x: randomInteger(), y: randomInteger() },
  { x: randomInteger(), y: randomInteger() },
  { x: randomInteger(), y: randomInteger() },
];

function UpdateMap() {
  $("childrenRoot").remove();
  const divChildren = document.createElement("div");
  divChildren.setAttribute("id", "childrenRoot");
  divChildren.setAttribute("class", "board-game");
  root.append(divChildren);
  for (let i = 0; i <= maxRow; i++)
    for (let j = 0; j <= maxColumn; j++) {
      const div = document.createElement("div");
      div.setAttribute("class", "square");
      div.setAttribute("data-x", i);
      div.setAttribute("data-y", j);

      if (i === indexRed.currentX && j === indexRed.currentY) {
        const red = document.createElement("div");
        red.setAttribute("class", "red");
        div.append(red);
      }
      if (Check(i, j)) {
        const Black = document.createElement("div");
        Black.setAttribute("class", "black");
        div.append(Black);
      }
      divChildren.append(div);
    }
}

const UpdateIndex = function (x, y) {
  indexRed.currentX = x;
  indexRed.currentY = y;
};

const up = $("up");
const down = $("down");
const right = $("right");
const left = $("left");

const upEvent = () => {
  if (indexRed.currentX > 0) {
    indexRed = { ...indexRed, currentX: indexRed.currentX - 1 };
    UpdateMap();
  }
};

const downEvent = () => {
  if (indexRed.currentX < maxRow) {
    indexRed = { ...indexRed, currentX: indexRed.currentX + 1 };
    UpdateMap();
  }
};
const leftEvent = () => () => {
  if (indexRed.currentY > 0) {
    indexRed = { ...indexRed, currentY: indexRed.currentY - 1 };
    UpdateMap();
  }
};

const rightEvent = () => {
  if (indexRed.currentY < maxColumn) {
    indexRed = { ...indexRed, currentY: indexRed.currentY + 1 };
    UpdateMap();
  }
};

up.addEventListener("click", upEvent);
down.addEventListener("click", downEvent);
right.addEventListener("click", rightEvent);
left.addEventListener("click", leftEvent);

window.onkeyup = function (e) {
  console.log("🚀 ~ file: code.js ~ line 102 ~ e", e.keyCode);
  if (e.keyCode === 38) {
    upEvent();
  }
  if (e.keyCode === 40) {
    downEvent();
  }
  if (e.keyCode === 39) {
    rightEvent();
  }
  if (e.keyCode === 37) {
    leftEvent();
  }
  if (e.keyCode === 13) {
    pickUpTrash();
  }
};

const pickUpTrash = () => {
  let isIndex = arrayBlack.findIndex(
    (item) => item.x == indexRed.currentX && item.y == indexRed.currentY
  );
  if (isIndex !== -1) {
    arrayBlack.splice(isIndex, 1);
    UpdateMap();
    if (arrayBlack.length === 0) {
      alert("chúc mừng bạn đã thắng");
    }
  }
};

// add event click S button
const startBtn = $("start");

function start() {
  alert("bắt đầu trò chơi");
  UpdateMap();
}
startBtn.addEventListener("click", start);

// add event click A button
const pickUpBtn = $("pickUp");

function lumRac() {
  pickUpTrash(indexRed.currentX, indexRed.currentY);
  UpdateMap();
}
pickUpBtn.addEventListener("click", lumRac);
