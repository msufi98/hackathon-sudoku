//import sudokutoolcollection from "https://cdn.skypack.dev/sudokutoolcollection@1.1.3";
puzzle = document.querySelector("#Puzzle");

for (let i = 1; i <= 9; i++) {
  for (let j = 1; j <= 9; j++) {
    cell = document.createElement("div");
    cell.id = "i" + i + "_" + j;
    cell.classList.add("cell");
    if(boxSelector(i,j)%2 == 0)cell.classList.add("even")
    else cell.classList.add("odd")
    
    cell.classList.add("box"+boxSelector(i,j))
    puzzle.appendChild(cell);
  }
}

function boxSelector(row,col) {
  if(row <=3){
    if(col<=3) return 1
    else if(col >= 4 && col <= 6) return 2
    else return 3
  }
  if(row>=4 && row<=6){
    if(col<=3) return 4
    else if(col >= 4 && col <= 6) return 5
    else return 6
  }
  else{
    if(col<=3) return 7
    else if(col >= 4 && col <= 6) return 8
    else return 9
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
    selected.node.classList.remove("selected");
  }
  selected = {
    node: document.querySelector("#i" + row + "_" + col),
    r: row,
    c: col,
  };
  selected.node.classList.add("selected");
}

document.addEventListener("keydown", (e) => {
  console.log(e.key);
  if (selected !== undefined) {
    if (e.key >= 1 && e.key <= 9 && selected !== undefined)
      selected.node.innerHTML = e.key;
    if (e.key === "ArrowUp") {
      matches = selected.node.id.match(/\d+/g);
      r = matches[0] - 1;
      if (r === 0) r = 9;
      select(r, matches[1]);
    }
    if (e.key === "ArrowDown") {
      matches = selected.node.id.match(/\d+/g);
      r = parseInt(matches[0]) + 1;
      if (r === 10) r = 1;
      console.log(r, matches[1]);
      select(r, matches[1]);
    }
    if (e.key === "ArrowLeft") {
      matches = selected.node.id.match(/\d+/g);
      c = matches[1] - 1;
      if (c === 0) c = 9;
      select(matches[0], c);
    }
    if (e.key === "ArrowRight") {
      matches = selected.node.id.match(/\d+/g);
      c = parseInt(matches[1]) + 1;
      if (c === 10) c = 1;
      select(matches[0], c);
    }
  }
});


setBoard()
async function setBoard(){
  // give easy, ,medium or hard
  boards = await boardFetcher("hard");
  console.log(boards);

  for(let i=1; i <=9;i++){
    for(let j= 1; j<=9;j++){
      if(boards[0][i-1][j-1]!==0)
      document.querySelector("#i"+i+"_"+j).innerHTML = boards[0][i-1][j-1]
    }
  }
}


async function boardFetcher(level) {
  unsolved = "";
  solved = "";
  const response = await fetch(
    `https://sugoku.herokuapp.com/board?difficulty=${level}`
  );
  unsolved = await response.json();
  console.log(unsolved.board);

  const encodeBoard = (board) =>
    board.reduce(
      (result, row, i) =>
        result +
        `%5B${encodeURIComponent(row)}%5D${
          i === board.length - 1 ? "" : "%2C"
        }`,
      ""
    );

  const encodeParams = (params) =>
    Object.keys(params)
      .map((key) => key + "=" + `%5B${encodeBoard(params[key])}%5D`)
      .join("&");

  const response2 = await fetch("https://sugoku.herokuapp.com/solve", {
    method: "POST",
    body: encodeParams(unsolved),
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  solved = await response2.json();
  console.log(solved.solution);
  //console.log(sudokutoolcollection.sudoku().generator.generate("easy"))

  return [await unsolved.board, await solved.solution];
}
