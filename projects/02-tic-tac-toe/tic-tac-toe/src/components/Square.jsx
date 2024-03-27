export default function Square({ children, isSelected, updateBoard, index }) {

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <>
      <div onClick={handleClick} className={`square ${isSelected ? 'is-selected' : ''}`}>
        {children}
      </div >
    </>
  )
}