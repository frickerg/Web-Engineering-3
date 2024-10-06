import styled from'styled-components'
import CenterButton from '../../elements/Button/components/CenterButton'
import LogoutButton from '../../elements/Button/components/LogoutButton'
import { TopBannerRouterLink } from '../../typography/links/TopBannerRouterLink'
import { AuthContext } from '../../../session/AuthContext'
import { useContext } from 'react'
import { ManageCardsButton } from '../../elements/Button/components/ManageCardsButton'
// import MobileMenuBackgroundContainer from '../../elements/Container/components/MobileMenuBackgroundContainer'

const FullscreenMobileMenu = () => {
  const { state } = useContext(AuthContext)

  //TODO Wenn das Burgermenu geoeffnet oder geschlossen wird, soll sich die Hintergrundfarbe vom LayoutContainer anpassen, damit beim Darstellen vom Fullscreen Mobile Menu dunkelblaue Hintergrundfarbe in der grid-area mainContent angezeigt wird.
  //FIX Das Togglen klappt in MobileMenuBackgroundContainer - aber Hintergrundfarbe liegt vor allen Inhalten.
  return (
    <FullscreenMobileMenuContainer>
      {/* <MobileMenuBackgroundContainer> */}
        <NavContentContainer>
          <CenterButton />
          <ManageCardsButton>
            {state.user?.role === 'admin' && (
              <TopBannerRouterLink to="/cards" style={{ color: 'white' }}>Manage Cards</TopBannerRouterLink>
            )}
          </ManageCardsButton>
        </NavContentContainer>
        <FooterContainer>
          <LogoutButton/>
        </FooterContainer>
      {/* </MobileMenuBackgroundContainer> */}
    </FullscreenMobileMenuContainer> 
  )
}

//TODO: koennte man noch als eigene components auslagern.
const FullscreenMobileMenuContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-template-areas: 
    'head'
    'navContent'
    '. '
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
  justify-content: center;
  align-items: center;
`

const FooterContainer = styled.div`
  grid-area: footer;
  grid-row: 4;
  align-self: end;
  justify-content: center;
  align-items: center;
`

export default FullscreenMobileMenu