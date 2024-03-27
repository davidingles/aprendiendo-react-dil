import confetti from 'canvas-confetti'
import { useState } from 'react'
import WinnerModal from './components/WinnerModal.jsx'
import Square from './components/Square.jsx'
import './App.css'
import { TURNO } from './constants.js'
import { checkWinnerFrom, checkEndGame } from './logic/board.js'
import { saveGameToStorage, resetGameStorage } from './storage/index.js'


export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNO.X)
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNO.X)
    setWinner(null)

    resetGameStorage()

  }

  const updateBoard = (index) => {
    if (board[index] || winner) return
    if (board[index] === null) {
      const newBoard = [...board]
      newBoard[index] = turn
      setBoard(newBoard)
      const newTurn = (turn === TURNO.X) ? TURNO.O : TURNO.X
      setTurn(newTurn)
      // guardar aqui partida
      saveGameToStorage({
        board: newBoard,
        turn: newTurn
      })
      const newWinner = checkWinnerFrom(newBoard)
      if (newWinner) {
        confetti()
        setWinner(newWinner)
      } else if (checkEndGame(newBoard)) {
        setWinner(false)
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
                <Square
                  className='square'
                  key={index}
                  updateBoard={updateBoard}
                  index={index}
                >
                  {value}
                </Square>
              )
            })
          }
        </div>
      </div>
      <div className='turnos'>
        <Square
          isSelected={turn === TURNO.X}
        >
          {TURNO.X}
        </Square>
        <Square
          isSelected={turn === TURNO.O}
        >
          {TURNO.O}
        </Square>
      </div >
      <WinnerModal resetGame={resetGame} winner={winner} />
    </>
  )
}

