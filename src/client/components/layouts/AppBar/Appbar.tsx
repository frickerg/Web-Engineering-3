import styled from 'styled-components'
import BurgerMenu from '../../elements/Menu/BurgerMenu'
import CenterButton from '../../elements/Button/components/CenterButton'
import { TitleHeader } from '../../typography/headings/TitleHeader'
import { TopBannerContainer } from '../../elements/Container/components/TopBannerContainer'
import { TopBannerRouterLink } from '../../typography/links/TopBannerRouterLink'
import { AuthContext } from '../../../session/AuthContext'
import { useContext } from 'react'
import LogoutButton from '../../../../onlyForTestPurpose/LogoutButton'
import { viewportDevice } from '../../../themes/Breakpoints'

export default function Appbar() {
  const { state } = useContext(AuthContext)

  return (
    <AppbarContainer>
      <TitleContainer>
        <TitleHeader>Mimir</TitleHeader>
        <UserInfo>{state.user?.username}</UserInfo>
      </TitleContainer>
      <CenterContainer>
        <CenterButton />
      </CenterContainer>
      <RightContainer>
        {state.user?.role === 'admin' && (
          <TopBannerRouterLink to="/cards">Manage Cards</TopBannerRouterLink>
        )}
        <LogoutButton />
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
  align-items: baseline;
  gap: 10px;
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
  gap: 10px;

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
const UserInfo = styled.p`
  color: #99b4c5;
`
