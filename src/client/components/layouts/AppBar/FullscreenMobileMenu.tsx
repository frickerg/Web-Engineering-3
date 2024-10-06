import styled from'styled-components'
import CenterButton from '../../elements/Button/components/CenterButton'
import LogoutButton from '../../elements/Button/components/LogoutButton'
import { TopBannerRouterLink } from '../../typography/links/TopBannerRouterLink'
import { AuthContext } from '../../../session/AuthContext'
import { useContext } from 'react'
import { ManageCardsButton } from '../../elements/Button/components/ManageCardsButton'
import MobileMenuBackgroundContainer from '../../elements/Container/components/MobileMenuBackgroundContainer'

const FullscreenMobileMenu = () => {
  const { state } = useContext(AuthContext)

  return (
    <FullscreenMobileMenuContainer>
      <NavContentContainer style={{ gridRow: '2' }}>
        <CenterButton />
      </NavContentContainer>
      <NavContentContainer style={{ gridRow: '3' }}>
        <ManageCardsButton>
          {state.user?.role === 'admin' && (
            <TopBannerRouterLink to="/cards" style={{ color: '#fefefe' }}>Manage Cards</TopBannerRouterLink>
          )}
        </ManageCardsButton>
      </NavContentContainer>
      <MobileMenuBackgroundContainer />
      <FooterContainer>
        <LogoutButton />
      </FooterContainer>
    </FullscreenMobileMenuContainer>
  )
}

//TODO: koennte man noch als eigene components auslagern.
const FullscreenMobileMenuContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

  /* //NOTE: FullScreenMobileMenu grid-template-areas 
  rows                1     2         3           4     5
  area                head navContent navContent filler footer
  components          1 HeaderContainer in AppBar für Title, UserInfo
                      2 NavContentContainer für alle User
                      3 NavContentContainer für Admin ManageCards
                      4 MobileMenuBackgroundContainer für restliche Hintergrundfarbe bei geoeffnetem Burger Menu
                      5 FooterContainer für alle User zwecks Logout Button
  */
  grid-template-rows: 80px auto auto 1fr auto;
  grid-template-areas: 
    'head'
    'navContent'
    'navContent'
    'filler '
    'footer';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
const NavContentContainer = styled.div`
  grid-area: navContent;
  grid-row: 2;
  background-color: #182d4a;
  padding-bottom: 6px;
  justify-content: center;
  align-items: center;
`

// const NavContentContainerA = styled.div`
//   grid-area: navContent;
//   grid-row: 2;
//   background-color: #182d4a;
//   /* padding-bottom: 6px; */
//   justify-content: center;
//   align-items: center;
// `
// const NavContentContainerB = styled.div`
//   grid-area: navContent;
//   grid-row: 3;
//   background-color: #182d4a;
//   padding-top: 6px;
//   justify-content: center;
//   align-items: center;
// `
const FooterContainer = styled.div`
  grid-area: footer;
  grid-row: 5;
  align-self: end;
  justify-content: center;
  align-items: center;
`
export default FullscreenMobileMenu