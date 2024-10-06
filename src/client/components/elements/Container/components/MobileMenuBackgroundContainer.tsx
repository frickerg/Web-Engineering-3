import styled from 'styled-components'
import { useContext } from 'react'
import { ViewportContext } from '../../../../session/ResponsiveContext'
import { NavigationContext } from '../../../../session/NavigationContext'

export default function MobileMenuBackgroundContainer() {
  const isMobile = useContext(ViewportContext)
  const isOpen = useContext(NavigationContext)

  if (isMobile && isOpen) {
    return <MobileMenuIsOpenBackground></MobileMenuIsOpenBackground>
  }

  if (!isOpen || !isMobile) {
    return <MobileMenuIsClosedBackground></MobileMenuIsClosedBackground>
  }
}

export const MobileMenuIsOpenBackground = styled.div`
  grid-area: filler;
  grid-row: 4;
  background-color: #182d4a;
  justify-content: center;
  align-items: center;
`

export const MobileMenuIsClosedBackground = styled.div`
  grid-area: filler;
  grid-row: 3;
`
