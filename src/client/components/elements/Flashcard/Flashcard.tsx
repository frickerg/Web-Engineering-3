import styled from 'styled-components'

type InputProps = {
  text: string
}

const StyledFlashcard = styled.div`
  width: 500px;
  height: 350px;
  margin: 20px;
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

function Flashcard(props: Readonly<InputProps>) {
  return <StyledFlashcard>{props.text ?? 'No cards found'}</StyledFlashcard>
}

export default Flashcard
