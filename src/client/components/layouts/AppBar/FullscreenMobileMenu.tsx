import styled from 'styled-components'
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
        <div>
          {state.user?.role === 'admin' ? (
            <ManageCardsButton>
              {' '}
              {state.user?.role === 'admin' && (
                <TopBannerRouterLink to="/cards" style={{ color: '#fefefe' }}>
                  Manage Cards
                </TopBannerRouterLink>
              )}
            </ManageCardsButton>
          ) : null}
        </div>
      </NavContentContainer>
      <MobileMenuBackgroundContainer />
      <FooterContainer>
        <LogoutButton />
      </FooterContainer>
    </FullscreenMobileMenuContainer>
  )
}

const FullscreenMobileMenuContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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

const FooterContainer = styled.div`
  grid-area: footer;
  grid-row: 5;
  align-self: end;
  justify-content: center;
  align-items: center;
`
export default FullscreenMobileMenu
