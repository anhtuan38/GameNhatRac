const $ = (value) => {
  return document.getElementById(value);
};

const maxRow = 12;
const maxColumn = 13;
const root = $("root");
let indexRed = { curentX: 0, curentY: 0 };
let arrayBlack = [
  { x: 1, y: 5 },
  { x: 6, y: 4 },
  { x: 3, y: 3 },
  { x: 4, y: 2 },
];

function UpdateMap() {
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
  $("childrenRoot").remove();
  const div1 = document.createElement("div");
  div1.setAttribute("id", "childrenRoot");
  div1.setAttribute("class", "board-game");
  root.append(div1);
  for (let i = 0; i <= maxRow; i++)
    for (let j = 0; j <= maxColumn; j++) {
      const div = document.createElement("div");
      div.setAttribute("class", "square");
      div.setAttribute("data-x", i);
      div.setAttribute("data-y", j);

      if (i === indexRed.curentX && j === indexRed.curentY) {
        const red = document.createElement("div");
        red.setAttribute("class", "red");
        div.append(red);
      }
      if (Check(i, j)) {
        const Black = document.createElement("div");
        Black.setAttribute("class", "black");
        div.append(Black);
      }
      div1.append(div);
    }
}

const startBtn = $("start");

function start() {
  alert("bắt đầu trò chơi");
  UpdateMap();
}
startBtn.addEventListener("click", start);

const UpdateIndex = function (x, y) {
  indexRed.curentX = x;
  indexRed.curentY = y;
};

const up = $("up");
const down = $("down");
const right = $("right");
const left = $("left");

up.addEventListener("click", (e) => {
  if (indexRed.curentX > 0) {
    indexRed = { ...indexRed, curentX: indexRed.curentX - 1 };
    UpdateMap();
  }
});
down.addEventListener("click", (e) => {
  if (indexRed.curentX < maxRow) {
    indexRed = { ...indexRed, curentX: indexRed.curentX + 1 };
    UpdateMap();
  }
});
right.addEventListener("click", (e) => {
  if (indexRed.curentY < maxColumn) {
    indexRed = { ...indexRed, curentY: indexRed.curentY + 1 };
    UpdateMap();
  }
});

left.addEventListener("click", (e) => {
  if (indexRed.curentY > 0) {
    indexRed = { ...indexRed, curentY: indexRed.curentY - 1 };
    UpdateMap();
  }
});

const pickUpTrash = () => {
  let isIndex = arrayBlack.findIndex(
    (item) => item.x == indexRed.curentX && item.y == indexRed.curentY
  );
  if (isIndex !== -1) {
    arrayBlack.splice(isIndex, 1);
    UpdateMap();
    if (arrayBlack.length === 0) {
      alert("chúc mừng bạn đã thắng");
    }
  }
};

const pickUpBtn = $("pickUp");

function lumRac() {
  pickUpTrash(indexRed.curentX, indexRed.curentY);
  UpdateMap();
}
pickUpBtn.addEventListener("click", lumRac);
