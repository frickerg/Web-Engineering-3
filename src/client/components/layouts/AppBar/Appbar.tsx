import styled from 'styled-components'
import BurgerMenu from '../../elements/Menu/BurgerMenu'
import CenterButton from '../../elements/Button/components/CenterButton'
import { TitleHeader } from '../../typography/headings/TitleHeader'
import { TopBannerContainer } from '../../elements/Container/components/TopBannerContainer'
import { TopBannerRouterLink } from '../../typography/links/TopBannerRouterLink'
import { viewportDevice } from '../../../themes/Breakpoints'

export default function Appbar() {
  return (
    <AppbarContainer>
      <TitleContainer>
        <TitleHeader>Mimir</TitleHeader>
      </TitleContainer>
      <CenterContainer>
        <CenterButton />
      </CenterContainer>
      <RightContainer>
        <TopBannerRouterLink to="/cards">Manage Cards</TopBannerRouterLink>
      </RightContainer>
      <MobileMenu>
        <BurgerMenu />
      </MobileMenu>
    </AppbarContainer>
  )
}


const AppbarContainer = styled(TopBannerContainer)`
  grid-template-areas: 'title center right';

  @media (${viewportDevice.mobile}) {
    grid-template-columns: 1fr auto;
    grid-template-areas: 'title right';
  }
`

const TitleContainer = styled.div`
  grid-area: title;
  display: flex;
  align-items: center;
`

const CenterContainer = styled.div`
  grid-area: center;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (${viewportDevice.mobile}) {
    display: none;
  }
`

const RightContainer = styled.div`
  grid-area: right;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media (${viewportDevice.mobile}) {
    display: none;
  }
`

const MobileMenu = styled.div`
  display: none;

  @media (${viewportDevice.mobile}) {
    display: flex;
    justify-content: flex-end;
  }
`
