import styled from 'styled-components'

type ContainerProps = {
  className?: string
  children: React.ReactNode
}

export default function Container(props: Readonly<ContainerProps>) {
  return (
    <StyledContainer className={props.className}>
      {props.children}
    </StyledContainer>
  )
}

const StyledContainer = styled.div``
