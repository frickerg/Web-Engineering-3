import { createContext, useState, ReactNode } from 'react'
export const NavigationContext = createContext({
  isOpen: false,
  toggleNav: () => {},
})

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleNav = () => {
    setIsOpen(!isOpen)
  }

  return (
    <NavigationContext.Provider value={{ isOpen, toggleNav }}>
      {children}{' '}
    </NavigationContext.Provider>
  )
}
