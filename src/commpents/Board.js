import React from 'react';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick} style={props.highlight ? {color: "red"} : {}}> 
      {props.value}
    </button>
  )
  // if (props.highlight) {
  //   return (
  //     <button className="square" onClick={props.onClick} style={{color: "red"}}> 
  //       {props.value}
  //     </button>
  //   );
  // }else {
  //   return (
  //     <button className="square" onClick={props.onClick}>
  //       {props.value}
  //     </button>
  //   );
  // }
}

// Board commponent
class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        highlight={this.props.winnerLine.includes(i)}
      />
    );
  }

  render() {
    var rows = [];
    for (var i=0; i<3 ; i++){
      var row = [];
      for (var j=3*i; j<3*i+3;j++){
        row.push(<i key={j}>{this.renderSquare(j)}</i>);
      }
      rows.push(<div className="board=row" key={i}>{row}</div>)
    }
    return (
      <div>
        {rows}
      </div>
    );
  }
}

export default Board;