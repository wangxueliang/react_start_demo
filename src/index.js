import React from 'react';
import ReactDOM from 'react-dom';
import Board from './commpents/Board';
import './index.css';

// like to backgammon
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {winner:squares[a], line:[a, b, c]};
    }
  }
  return {winner:null, line:[]};
}


// Game commponent
class Game extends React.Component {
  constructor() {
    super();
    this.state = {
        history: [{
          squares: Array(9).fill(null),
          lastStep: 'Game start',
        }],
        stepNumber: 0,
        xIsNext: true,
    }
  }

  // the method for click
  handleClick(i) {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice(); 
    // if the game is over, forbid to click
    // or this square is clicked 
    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'o';
    const location = '('+ (Math.floor(i / 3)+1) + ',' + ((i % 3)+1) + ')';
    const desc = squares[i] + ' moved to ' + location;

    this.setState({
      history: history.concat([{
        squares: squares,
        lastStep: desc
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  // go back {x} step
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true,
    });
  }

  render() {
     // judage the winner 
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const calRes = calculateWinner(current.squares);
    const winner = calRes.winner;
    const winnerLine = calRes.line;

    // record the operation process
    const moves = history.map((step, move) => {
      const desc = step.lastStep;
      return (
        <li key={move}>
          {move === this.state.stepNumber ? (
            <a href="#" onClick={() => this.jumpTo(move)}><strong>{desc}</strong></a>
          ) : (
            <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
          )}
       </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winnerLine={winnerLine}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
  
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
