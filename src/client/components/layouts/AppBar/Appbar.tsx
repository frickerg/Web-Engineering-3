import CenterButton from '../../elements/Button/CenterButton'
import Header1 from '../../typography/headings/Header1'
import TopBannerContainer from '../../elements/Container/TopBannerContainer'
import TopBannerRouterLink from '../../typography/links/TopBannerRouterLink'

function Appbar() {
  return (
    <TopBannerContainer>
      <Header1>Mimir</Header1>
      <CenterButton />
      <TopBannerRouterLink to="/cards">
        Manage Cards
      </TopBannerRouterLink>
    </TopBannerContainer>
  )
}

export default Appbar
