import React from "react";
import { hot } from "react-hot-loader";
import { calculateWinner, getStatus, ABC_SORT, CBA_SORT } from "./helpers";
import { MovesList, SortButton } from "./MovesList";
import { Board } from "./Board";
import "./App.scss";

export function GameStatus(props) {
  return (
    <div className="game-status">{props.status}</div>
  );
}
  
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(10).fill(null),
          order: Array(10).fill(null),
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
    const status = getStatus(this.state);

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
          <GameStatus status={status} />
          <MovesList 
            history={this.state.history} 
            sortDirection={this.state.sortDirection} 
            stepNumber={this.state.stepNumber} 
            jumpTo={k => this.jumpTo(k)} 
          />
          <SortButton 
            sortDirection={this.state.sortDirection} 
            onClick={() => this.handleChangeDirection()}
          ></SortButton>
        </div>
      </div>
    );
  }
}

export default hot(module)(Game);
