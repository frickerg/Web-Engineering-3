import { ViewportContext } from '../../../session/ResponsiveContext'
import { AuthContext } from '../../../session/AuthContext'
import { useContext, useState } from 'react'
import { TopBannerContainer as AppbarContainer } from '../../elements/Container/components/TopBannerContainer'
import { TopBannerLeftContainer as HeaderContainer } from '../../elements/Container/components/TopBannerLeftContainer'
import { TopBannerCenterContainer as CenterContainer } from '../../elements/Container/components/TopBannerCenterContainer'
import { TopBannerRightContainer as RightContainer } from '../../elements/Container/components/TopBannerRightContainer'
import { UserInfo } from '../../typography/texts/UserInfo'
import { TitleHeader as Title } from '../../typography/headings/TitleHeader'
import { BurgerButton } from '../../elements/Button/components/BurgerButton'
import FullscreenNav from './FullscreenMobileMenu'
import CenterButton from '../../elements/Button/components/CenterButton'
import LogoutButton from '../../elements/Button/components/LogoutButton'
import { TopBannerRouterLink } from '../../typography/links/TopBannerRouterLink'
import { ManageCardsButton } from '../../elements/Button/components/ManageCardsButton'

export default function Appbar() {
  const isMobile = useContext(ViewportContext)
  const { state } = useContext(AuthContext)
  const [isOpen] = useState(false)

  if (isMobile) {
    return (
      <AppbarContainer>
        <HeaderContainer>
          <Title>Mimir</Title>
          <UserInfo>{state.user?.username}</UserInfo>
        </HeaderContainer>
        <CenterContainer></CenterContainer>
        <RightContainer>
          <BurgerButton></BurgerButton>
          {isOpen ? <FullscreenNav /> : null}
        </RightContainer>
      </AppbarContainer>
    )
  }
  if (!isMobile) {
    return (
      <AppbarContainer>
        <HeaderContainer>
          <Title>Mimir</Title>
          <UserInfo>{state.user?.username}</UserInfo>
        </HeaderContainer>
        <CenterContainer>
          <CenterButton />
        </CenterContainer>
        <RightContainer>
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
          <LogoutButton></LogoutButton>
        </RightContainer>
      </AppbarContainer>
    )
  }
}
