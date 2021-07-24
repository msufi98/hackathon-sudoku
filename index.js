puzzle = document.querySelector("#Puzzle");

for (let i = 1; i <= 9; i++) {
  for (let j = 1; j <= 9; j++) {
    cell = document.createElement("div");
    cell.id = "i" + i + "_" + j;
    cell.classList.add("cell");
    puzzle.appendChild(cell);
  }
}
selected = undefined;

puzzle.addEventListener("click", (e) => {
  if (e.target.classList.contains("cell")) {
    matches = e.target.id.match(/\d+/g);
    select(matches[0], matches[1]);
    console.log(matches);
  }
  console.log(selected);
});

function select(row, col) {
  if (selected !== undefined) {
    selected.classList.remove("selected");
  }
  selected = document.querySelector("#i" + row + "_" + col);
  selected.classList.add("selected");
}

document.addEventListener("keydown", (e) => {
  console.log(e.code);
  if (selected !== undefined) {
    if (e.key >= 1 && e.key <= 9 && selected !== undefined)
      selected.innerHTML = e.key;
    if (e.key === "ArrowUp") {
      matches = selected.id.match(/\d+/g);
      r = matches[0] - 1;
      if (r === 0) r = 9;
      select(r, matches[1]);
    }
    if (e.key === "ArrowDown") {
      matches = selected.id.match(/\d+/g);
      r = parseInt(matches[0]) + 1;
      if (r === 10) r = 1;
      console.log(r, matches[1]);
      select(r, matches[1]);
    }
    if (e.key === "ArrowLeft") {
      matches = selected.id.match(/\d+/g);
      c = matches[1] - 1;
      if (c === 0) c = 9;
      select(matches[0], c);
    }
    if (e.key === "ArrowRight") {
      matches = selected.id.match(/\d+/g);
      c = parseInt(matches[1]) + 1;
      if (c === 10) c = 1;
      select(matches[0], c);
    }
  }
});


