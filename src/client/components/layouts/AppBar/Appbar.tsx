import CenterButton from '../../elements/Button/components/CenterButton'
import { TitleHeader } from '../../typography/headings/TitleHeader'
import { TopBannerContainer } from '../../elements/Container/components/TopBannerContainer'
import { TopBannerRouterLink } from '../../typography/links/TopBannerRouterLink'

export default function Appbar() {
  return (
    <TopBannerContainer>
      <TitleHeader>Mimir</TitleHeader>
      <CenterButton />
      <TopBannerRouterLink to="/cards">Manage Cards</TopBannerRouterLink>
    </TopBannerContainer>
  )
}
