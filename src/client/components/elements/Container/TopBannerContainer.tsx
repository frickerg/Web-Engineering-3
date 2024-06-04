import styled from 'styled-components'
import Container from './Container';

type TopBannerContainerProps = {
  className?: string
  children: React.ReactNode;

}

const StyledTopBannerContainer = styled(Container)`
  background-color: #182d4a;
  color: #fefefe;
  padding: 20px 15px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
`

function TopBannerContainer(props: Readonly<TopBannerContainerProps>) {
  return (
    <StyledTopBannerContainer className={props.className}>
      {props.children}
    </StyledTopBannerContainer>
  )
}

export default TopBannerContainer