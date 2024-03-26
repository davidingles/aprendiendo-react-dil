import confetti from 'canvas-confetti'
import { useState } from 'react'
import WinnerModal from './components/WinnerModal.jsx'
import Square from './components/Square.jsx'
import './App.css'

const TURNO = {
  X: 'X',
  O: 'O'
}

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNO.X)
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNO.X)
    setWinner(null)
  }


  const WINNER_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  const checkWinner = (boardToCheck) => {
    // revisamos todas las combinaciones ganadoras
    // para ver si X u O ganó
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    // si no hay ganador
    return null
  }

  const handleTurn = (index) => {
    if (board[index] || winner) return
    if (board[index] === null) {
      const newBoard = [...board]
      newBoard[index] = turn
      setBoard(newBoard)
      const newTurn = (turn === TURNO.X) ? TURNO.O : TURNO.X
      setTurn(newTurn)
      const newWinner = checkWinner(newBoard)
      if (newWinner) {
        confetti()
        setWinner(newWinner)
      }
    }
  }

  return (
    <>
      <div>
        Auxiliar Manipuladora del Cartón
      </div>
      <button onClick={resetGame}>Reinicia el juego</button>
      <div className='board'>
        <div className='game'>
          {
            board.map((value, index) => {
              return (
                <div
                  className='square'
                  key={index}
                  onClick={() => handleTurn(index)}
                >
                  {board[index]}
                </div>
              )
            })
          }
        </div>
      </div>
      <div className='turnos'>
        <div
          className={`square ${(turn === TURNO.X) ? 'is-selected' : ''}`}
        >
          {TURNO.X}
        </div>
        <div className={`square ${(turn === TURNO.O) ? 'is-selected' : ''}`} >
          {TURNO.O}
        </div>
      </div >
      <WinnerModal resetGame={resetGame} winner={winner} />
    </>
  )
}

