for (let i = 0; i <= 13; i++)
  for (let j = 0; j <= 12; j++) {
    const div = document.createElement("div");
    div.setAttribute("class", "square");
    div.setAttribute("data-x", i);
    div.setAttribute("data-y", j);
    root.append(div);
  }

document
  .getElementById("start")
  .addEventListener("click", alert("bắt đầu trò chơi"));
