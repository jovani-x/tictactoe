import React from "react";
import { calculateBoardPosition, CBA_SORT } from "./helpers";

export function MovesList(props) {
  const history = props.history;
  const current = history[props.stepNumber];
  const order = current.order;

  const direction = props.sortDirection;
  const testHistory = (direction === CBA_SORT) ? history.slice(0).reverse() : history;

  const moves = testHistory.map((step, ix) => {
    const move = (direction === CBA_SORT) ? testHistory.length - 1 - ix : ix;
    const boardPosition = calculateBoardPosition( step.order[move] );

    const desc = move ?
      `Go to move # ${move} (col: ${boardPosition.col}, row: ${boardPosition.row}, square#: ${order[move] + 1})` : 
      'Go to game start';
    return (
      <li key={move} className={(step === current) ? 'active' : ''}>
        <button onClick={() => props.jumpTo(move)}>{desc}</button>
        </li>
    );
  });

  return (
    <ol className="moves">{moves}</ol>
  );
}

export function SortButton(props) {
  return (
    <button className="sort-button" onClick={() => props.onClick()}>Sort actions by {props.sortDirection}</button>
  );
}
