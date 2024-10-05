import { useState } from 'react';
import { Button } from '../Button';
import { styled } from 'styled-components';
import FullscreenNav from '../../../layouts/AppBar/FullscreenNav';

  export const BurgerButton = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleClick = () => {
      setIsOpen(!isOpen)
    }
    
    function setMenuIcon() {
      return(isOpen === false? '☰' : '✕')
    }

    return (
      <BurgerButtonWrapper onClick={handleClick}>
        {setMenuIcon()}
        {isOpen? <FullscreenNav /> : null}
      </BurgerButtonWrapper>
    )
  }

  const BurgerButtonWrapper = styled(Button)`
    background: none;
    border: none;
    font-size: 30px;
    color: #fefefe;
`
