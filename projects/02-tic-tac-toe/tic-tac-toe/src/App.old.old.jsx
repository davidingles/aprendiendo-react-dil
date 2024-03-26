import { useState } from 'react'
import './App.css'

const TURNO = {
  X: 'X',
  O: 'O'
}

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNO.X)

  const handleTurn = (index) => {
    if (board[index] === null) {
      const newBoard = [...board]
      newBoard[index] = turn
      setBoard(newBoard)
      setTurn(turn === TURNO.X ? TURNO.O : TURNO.X)
    }
  }

  return (
    <>
      <div>
        Auxiliar Manipuladora del Cartón
      </div>
      <div className='board'>
        <div className='game'>
          {board.map((value, index) => (
            <div
              className='square'
              key={index}
              onClick={() => handleTurn(index)}
            >
              {value}
            </div>
          ))}
        </div>
      </div>
      <div className='turnos'>
        <div className={`square ${(turn === TURNO.X) ? 'is-selected' : ''}`}>
          {TURNO.X}
        </div>
        <div className={`square ${(turn === TURNO.O) ? 'is-selected' : ''}`}>
          {TURNO.O}
        </div>
      </div>
    </>
  )
}