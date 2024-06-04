import styled from 'styled-components'

type ProgressHeaderProps = {
  children: React.ReactNode;
}

const StyledProgressHeader = styled.h2`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

function ProgressHeader(props: Readonly<ProgressHeaderProps>) {
  return (
    <StyledProgressHeader>
      {props.children}
    </StyledProgressHeader>
  )
}

export default ProgressHeader