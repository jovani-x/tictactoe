import React from "react";

export function Square(props) {
  const extraClassName = props.isWin ? 'win-square' : '';

  return (
    <button className={`square ${extraClassName}`} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export function Board(props) {
  function renderSquare(i) {
    return (
      <Square
        key={i}
        isWin={props.winners && props.winners.includes(i)}
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
      />
    );
  }

  const rows = [];
  for (let i = 0; i < 3; i++) {
    let tmpRow = [];
    for (let j = 0; j < 3; j++) {
      tmpRow.push( renderSquare(i * 3 + j) );
    }
    rows.push(<div className="board-row" key={i}>{tmpRow}</div>);
  }

  return (
    <div>
      {rows}
    </div>
  );
}
