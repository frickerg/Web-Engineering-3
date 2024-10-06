import { createContext, useState, ReactNode } from 'react'
//TODO Wenn das Burgermenu geoeffnet oder geschlossen wird, soll sich die Hintergrundfarbe vom LayoutContainer anpassen, damit beim Darstellen vom Fullscreen Mobile Menu dunkelblaue Hintergrundfarbe in der grid-area mainContent angezeigt wird.
// --> Je nach Loesung den NavigationContext loeschen: Dieses TODO ist der einzige Use Case fuer dieses NavigationContext.

export const NavigationContext = createContext({ isOpen: false, toggleNav: () => {} })

export const NavigationProvider = ({ children }: { children: ReactNode }) =>  {

  const [isOpen, setIsOpen ] = useState(false)
  const toggleNav = () => {
    setIsOpen(!isOpen)
  }

  return (
    <NavigationContext.Provider value={{ isOpen, toggleNav }}>{children} </NavigationContext.Provider>
  )

}
