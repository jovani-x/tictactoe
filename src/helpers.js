export const ABC_SORT = 'asc';
export const CBA_SORT = 'desc';

export function calculateBoardPosition(i) {
  const col = (i % 3) + 1;
  const row = (i - (i % 3) ) / 3 + 1;
  return {col: col, row: row};
}

export function calculateWinner(squares) {
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
      return {
        winner: squares[a],
        combination: lines[i],
      };
    }
  }
  return null;
}

export function getStatus(state) {
  const history = state.history;
  const current = history[state.stepNumber];
  const winner = calculateWinner(current.squares);

  if (winner) {
    return "Winner: " + winner.winner;
  } else if (state.stepNumber === 9) {
    return "The result being a draw";
  } else {
    return "Next player: " + (state.xIsNext ? "X" : "O");
  }
}

export default { calculateBoardPosition, calculateWinner, getStatus, ABC_SORT, CBA_SORT };
