import CenterButton from '../../elements/Button/CenterButton'
import TitleHeader from '../../typography/headings/TitleHeader'
import TopBannerContainer from '../../elements/Container/TopBannerContainer'
import TopBannerRouterLink from '../../typography/links/TopBannerRouterLink'

export default function Appbar() {
  return (
    <TopBannerContainer>
      <TitleHeader>Mimir</TitleHeader>
      <CenterButton />
      <TopBannerRouterLink to="/cards">Manage Cards</TopBannerRouterLink>
    </TopBannerContainer>
  )
}
