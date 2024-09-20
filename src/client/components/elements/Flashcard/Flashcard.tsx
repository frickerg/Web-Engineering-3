import styled from 'styled-components'

type FlashcardProps = {
  text: string
}

export default function Flashcard(props: Readonly<FlashcardProps>) {
  return <StyledFlashcard>{props.text ?? 'No cards found'}</StyledFlashcard>
}

const StyledFlashcard = styled.div`
  width: 500px;
  height: 350px;
  margin: 40px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 40px;
  font-weight: bold;
  background-color: #f9f9f9;
  box-shadow: 0px 10px 8px rgba(0, 0, 0, 0.1);
`
