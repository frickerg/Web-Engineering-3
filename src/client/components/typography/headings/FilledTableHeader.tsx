import styled from 'styled-components'

type FilledTableHeaderProps = {
  children: React.ReactNode;
}

const StyledFilledTableHeader = styled.h3`
  font-weight: bold;
  background-color: #f0f0f0;
  padding: 10px;
  text-align: center;
`

function FilledTableHeader(props: Readonly<FilledTableHeaderProps>) {
  return (
    <StyledFilledTableHeader>
      {props.children}
    </StyledFilledTableHeader>
  )
}

export default FilledTableHeader