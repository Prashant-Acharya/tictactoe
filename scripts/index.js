let $ = (selector) => document.querySelector(selector);
let $$ = (selector) => document.querySelectorAll(selector);

let gameState = new Array(9).fill(null);
let winner = false;

function sweetAlert({ icon, title, text }) {
  Swal.fire({
    icon,
    title,
    text,
  }).then(() => {
    window.location.reload();
  });
}

function checkGameOver() {
  if (isTerminalState(gameState) === "x") {
    sweetAlert({
      icon: "success",
      title: "Congratulations",
      text: "You win",
    });
  }

  if (isTerminalState(gameState) === "o") {
    sweetAlert({
      icon: "error",
      title: "You loose.",
      text: "Better Luck Next Time.",
    });
  }

  if (isTerminalState(gameState) === "draw") {
    sweetAlert({
      icon: "info",
      title: "Draw",
      text: "You failed to win, better luck next time.",
    });
  }
}

function writeOnBoxes() {
  $$(".boxes").forEach((box, index) => {
    box.innerText = gameState[index];
  });
}

function cpuClick() {
  const bestMove = findBestMove(gameState);
  gameState[bestMove] = "o";
  checkGameOver();

  writeOnBoxes();
}

function playerClick(index) {
  if (!gameState[index]) {
    gameState[index] = "x";
    checkGameOver();
    if (!winner && gameState.filter((box) => box === null).length > 0) {
      setTimeout(() => {
        cpuClick();
      }, 100);
    }
  }

  writeOnBoxes();
}

function clickHandler() {
  $$(".boxes").forEach((box, index) =>
    box.addEventListener("click", () => playerClick(index))
  );
}

clickHandler();
writeOnBoxes();
