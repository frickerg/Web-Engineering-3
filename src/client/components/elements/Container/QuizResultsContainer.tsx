import styled from 'styled-components'
import Container from './Container';

const QuizResultsContainer = styled(Container)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 20px;
  width: 95%;
`

export default QuizResultsContainer