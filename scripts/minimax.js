function isTerminalState(gameState) {
  for (let pattern of winningPatterns) {
    if (
      gameState[pattern[0]] != null &&
      gameState[pattern[0]] === gameState[pattern[1]] &&
      gameState[pattern[1]] === gameState[pattern[2]]
    ) {
      return gameState[pattern[0]];
    }
  }

  if (gameState.filter((box) => box == null).length === 0) {
    return "draw";
  }

  return null;
}

const gs = ["x", null, "o", null, null, "x", "o", "x", "o"];

function findRandomMove(gameState) {
  const remainingEmptySlots = getEmptySlots(gameState);
  const randomIndex = Math.floor(Math.random() * remainingEmptySlots.length);
  return remainingEmptySlots[randomIndex];
}

function findBestMove(gameState) {
  const remainingEmptySlots = getEmptySlots(gameState);
  let bestScore = -Infinity;
  let bestMove;

  for (let i of remainingEmptySlots) {
    const gameStateCopy = [...gameState];
    gameStateCopy[i] = "o";
    const score = miniMax(gameStateCopy, false);
    if (score > bestScore) {
      bestScore = score;
      bestMove = i;
    }
  }

  return bestMove;
}

function miniMax(gameState, cpuTurn) {
  const result = isTerminalState(gameState);
  if (result === "o") return 1;
  if (result === "x") return -1;
  if (result === "draw") return 0;

  const emptySlots = getEmptySlots(gameState);

  const valueToInsert = cpuTurn ? "o" : "x";

  if (cpuTurn) {
    let bestScore = -Infinity;

    for (let emptySlot of emptySlots) {
      const gameStateCopy = [...gameState];
      gameStateCopy[emptySlot] = valueToInsert;
      const score = miniMax(gameStateCopy, false);

      bestScore = Math.max(bestScore, score);
    }

    return bestScore;
  } else {
    let bestScore = Infinity;

    for (let emptySlot of emptySlots) {
      const gameStateCopy = [...gameState];
      gameStateCopy[emptySlot] = valueToInsert;
      const score = miniMax(gameStateCopy, true);

      bestScore = Math.min(bestScore, score);
    }

    return bestScore;
  }
}

function getEmptySlots(gameState) {
  const remainingEmptySlots = [];
  for (let i = 0; i < gameState.length; i++) {
    if (!gameState[i]) remainingEmptySlots.push(i);
  }

  return remainingEmptySlots;
}

findBestMove(gs);
