export default function Square({ children, isSelected, updateBoard, index }) {

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <>
      <div onClick={handleClick} className="className">
        {children}
      </div>
    </>
  )
}