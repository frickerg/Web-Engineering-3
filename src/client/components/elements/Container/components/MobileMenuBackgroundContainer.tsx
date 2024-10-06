import styled from 'styled-components'
import { Container } from '../Container'
import { useContext } from 'react'
import { ViewportContext } from '../../../../session/ResponsiveContext'
import { NavigationContext } from '../../../../session/NavigationContext'

  //TODO Wenn das Burgermenu geoeffnet oder geschlossen wird, soll sich die Hintergrundfarbe vom LayoutContainer anpassen, damit beim Darstellen vom Fullscreen Mobile Menu dunkelblaue Hintergrundfarbe in der grid-area mainContent angezeigt wird.
  //FIX Das Togglen klappt in MobileMenuBackgroundContainer - aber Hintergrundfarbe liegt vor allen Inhalten.
  
export default function MobileMenuBackgroundContainer() {
  const  isMobile  = useContext(ViewportContext)
  const  isOpen  = useContext(NavigationContext)

    if(isMobile && isOpen) {
      return (<MobileMenuIsOpenBackground></MobileMenuIsOpenBackground>
    )}

    if(!isOpen || !isMobile) {
      return (<MobileMenuIsClosedBackground></MobileMenuIsClosedBackground>
    )}
}

export const MobileMenuIsOpenBackground = styled(Container)`
  display: grid;
  grid-area: mainContent;
  position: 'absolute';
  top: 0;
  left: 0;
  width: '100%';
  height: '100%';
  z-index: -1;
  background-color: #182d4a;
`

export const MobileMenuIsClosedBackground = styled(Container)`
    display: grid;
    grid-area: mainContent;
    height: 100vh;
    width: 100vw;
    z-index: -1;
    background-color: #f9f9f9;
`