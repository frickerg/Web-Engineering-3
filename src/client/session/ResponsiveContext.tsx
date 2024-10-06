import { createContext, useState, useEffect, ReactNode } from 'react'
import { breakpoint } from '../themes/Breakpoints'

export const ViewportContext = createContext(false)

export const ViewportProvider = ({ children }: { children: ReactNode }) => {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= breakpoint.mobile
  )

  useEffect(() => {
    const handleResize = () =>
      setIsMobile(window.innerWidth <= breakpoint.mobile)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <ViewportContext.Provider value={isMobile}>
      {children}
    </ViewportContext.Provider>
  )
}
