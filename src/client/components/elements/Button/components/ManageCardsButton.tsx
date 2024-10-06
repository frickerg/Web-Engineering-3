import { viewportDevice } from "../../../../themes/Breakpoints"
import { Button } from "../Button"
import { styled } from "styled-components"

export const ManageCardsButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;

  @media (${viewportDevice.desktop}) {
    padding: 10px 20px;
    width: auto;
  }
` 
