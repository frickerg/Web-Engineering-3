import styled from 'styled-components'
import Container from './Container';

type LayoutContainerProps = {
  className?: string
  children: React.ReactNode;

}

const StyledLayoutContainer = styled(Container)`
  min-height: 100vh;
  background-color: #e8e2e2;
`

function LayoutContainer(props: Readonly<LayoutContainerProps>) {
  return (
    <StyledLayoutContainer className={props.className}>
      {props.children}
    </StyledLayoutContainer>
  )
}

export default LayoutContainer