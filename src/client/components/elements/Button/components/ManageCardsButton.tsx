import { viewportDevice } from "../../../../themes/Breakpoints"
import { Button } from "../Button"
import { styled } from "styled-components"

export const ManageCardsButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;

  @media (${viewportDevice.mobile}) {
    border-top: 1px solid #182d4a;
  }

  @media (${viewportDevice.desktop}) {
    /* margin: 0px 20px; */
    padding: 10px 20px;
    width: auto;
    color: '#ffffff';
  }
` 