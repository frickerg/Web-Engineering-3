import './Flashcard.css'

type InputProps = {
  text: string
}

function Flashcard(props: Readonly<InputProps>) {
  return <div className="flashcard">{props.text ?? 'No cards found'}</div>
}

export default Flashcard
