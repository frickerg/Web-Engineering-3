import './Flashcard.css'

type InputProps = {
  text: string
}

function Flashcard(props: InputProps) {
  return <div className="flashcard">{props.text ?? 'No cards found'}</div>
}

export default Flashcard
