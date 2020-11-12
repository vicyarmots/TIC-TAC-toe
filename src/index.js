const gameBlock = document.querySelector(".game-block");
const cells = document.querySelectorAll(".item");
const modal = document.querySelector(".modal");
const modalText = document.querySelector(".modal-text");
const restartBtn = document.querySelector(".restart-btn");
const maxStepsLength = 9;

let gameArray = [];
let currentStep = 0;

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const insertContent = (cell, content) =>
  cell.insertAdjacentHTML(
    "afterBegin",
    `<span class='item-content'>${content}</span`
  );

const checkWinner = (winner) => {
  if (winner) {
    modalText.innerHTML = `The winner is ${winner}!`;
    modal.classList.remove("hide");
  }

  if (!winner && currentStep === maxStepsLength) {
    modalText.innerHTML = `Draw!`;
    modal.classList.remove("hide");
  }
};

const restart = () => {
  gameArray = [];
  currentStep = 0;

  modal.classList.add("hide");
  cells.forEach((x) => (x.innerHTML = ""));
};

gameBlock.addEventListener("click", ({ target }) => {
  if (target.hasChildNodes()) {
    return;
  }

  const content = currentStep % 2 === 0 ? "x" : "o";

  gameArray[target.id] = content;

  ++currentStep;

  insertContent(target, content);

  const winner = calculateWinner(gameArray);

  checkWinner(winner);
});

restartBtn.addEventListener("click", () => restart());
