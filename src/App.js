import React, { Component} from "react";
import {hot} from "react-hot-loader";
import "./App.css";

const ABC_SORT = 'abc';
const CBA_SORT = 'cba';

function Square(props) {
  const extraClassName = props.isWin ? 'win-square' : '';

  return (
    <button className={`square ${extraClassName}`} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function SortButton(props) {
  return (
  <button className="sort-button" onClick={() => props.onClick()}>Sort {props.sortDirection}</button>
  );
}
  
class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        isWin={this.props.winners && this.props.winners.includes(i)}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const rows = [];
    for (let i = 0; i < 3; i++) {
      let tmpRow = [];
      for (let j = 0; j < 3; j++) {
        tmpRow.push( this.renderSquare(i * 3 + j) );
      }
      rows.push(<div className="board-row" key={i}>{tmpRow}</div>);
    }

    return (
      <div>
        {rows}
      </div>
    );
  }
}
  
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          order: Array(9).fill(null),
        }
      ],
      sortDirection: ABC_SORT,
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const order = current.order.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    order[history.length] = i;

    this.setState({
      history: history.concat([
        {
          squares: squares,
          order: order,
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  handleChangeDirection() {
    const curDirection = this.state.sortDirection;
    const newDirection = (curDirection === ABC_SORT) ? CBA_SORT : ABC_SORT;

    this.setState({
      sortDirection: newDirection,
    });
  }

  jumpTo(step) {
    const history = this.state.history.slice(0, step + 1);

    this.setState({
      history: history,
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const order = current.order;

    const direction = this.state.sortDirection;
    const testHistory = (direction === CBA_SORT) ? history.slice(0).reverse() : history;

    const moves = testHistory.map((step, ix) => {
      const move = (direction === CBA_SORT) ? testHistory.length - 1 - ix : ix;
      const boardPosition = calculateBoardPosition( step.order[move] );

      const desc = move ?
        `Go to move # ${move} (col: ${boardPosition.col}, row: ${boardPosition.row}, square#: ${order[move]})` : 
        'Go to game start';
      return (
        <li key={move} className={(step === current) ? 'active' : ''}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner.winner;
    } else if (this.state.stepNumber === 9) {
      status = 'The result being a draw';
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winners={winner && winner.combination}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol className="moves">{moves}</ol>
          <SortButton sortDirection={this.state.sortDirection} onClick={() => this.handleChangeDirection()}></SortButton>
        </div>
      </div>
    );
  }
}

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
      return {
        winner: squares[a],
        combination: lines[i],
      };
    }
  }
  return null;
}

function calculateBoardPosition(i) {
  const col = (i % 3) + 1;
  const row = (i - (i % 3) ) / 3 + 1;
  return {col: col, row: row};
}

export default hot(module)(Game);
