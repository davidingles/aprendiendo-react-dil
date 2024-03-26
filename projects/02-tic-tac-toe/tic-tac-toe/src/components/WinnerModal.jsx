export default function WinnerModal({ resetGame, winner }) {
  if (winner === null) return null

  const winnerText = winner === false ? 'empate' : 'gano'

  return (
    <>
      <div>
        {winnerText}
      </div>
      <header>
        {winner && <div>{winner}</div>}
      </header>
      <footer>
        <button onClick={resetGame}>
          Empezar de nuevo
        </button>
      </footer>
    </>
  )
}