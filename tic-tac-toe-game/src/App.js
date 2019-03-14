import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Status from './status';

class App extends Component {
  constructor(){
    super()
    this.state={board: Array(9).fill(),
    player: null,winner: null}
  }
  boardwinner(){
    let winLines=
    [
      ["0", "1", '2'],
      ["3", "4", '5'],
      ["6", "7", '8'], 
      ["0", "3", '6'],
      ["1", "4", '7'],
      ["2", "5", '8'],
      ["0", "4", '8'],
      ["2", "4", '6'],
    ]
    this.checkboard(winLines)
  }
  checkboard(winLines){
    for (let i=0; i< winLines.length; i++) {
      const [a, b, c] = winLines[i];
      let board = this.state.board
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        alert('You won');
        this.setState({
          winner: this.state.player
        })
      }
    }
  }
  handleClick(index) {
    if (this.state.player && !this.state.winner) {
      let newBoard = this.state.board
      if (this.state.board[index] === null) {
        newBoard[index] = this.state.player
        this.setState({
          board: newBoard,
          player: this.state.player === "X" ? "O" : "X"
        })
        this.boardWinner()
      }
    }
  }
  setPlayer(player) {
    this.setState({ player })
  }
  renderBoxes() {
    return this.state.board.map(
      (box, index) =>
        <div className="box" key={index}
          onClick={() => this.handleClick(index)}>
          {box} </div>
    )
  }
        reset() {
          this.setState({
            player: null,
            winner: null,
            board: Array(9).fill(null)
          })
        }
 
  render() {
    return (
      <div className="container">
        <h1>Tic Tac Toe App</h1>
        <Status
          player={this.state.player}
          setPlayer={(e) => { this.setPlayer(e) }}
          winner={this.state.winner}
        />
        <div className="board">
          {this.renderBoxes()}
        </div>
        <button disabled={!this.state.winner} onClick={() => this.reset()}> Reset</button >
      </div>
    );
  }
}

export default App;
