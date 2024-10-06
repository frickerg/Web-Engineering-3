import styled from 'styled-components'
import { viewportDevice } from '../../../themes/Breakpoints'

type CheckboxProps = {
  id: string
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  className?: string
}

export default function Checkbox(props: Readonly<CheckboxProps>) {
  return (
    <StyledCheckbox className={props.className}>
      <StyledCheckboxInput
        type="checkbox"
        name={props.id}
        value={props.id}
        id={`${props.id}-checkbox`}
        onChange={() => props.onChange(!props.checked)}
        checked={props.checked}
      />
      <StyledCheckboxLabel htmlFor={`${props.id}-checkbox`}>
        {props.label}
      </StyledCheckboxLabel>
    </StyledCheckbox>
  )
}

const StyledCheckbox = styled.div`
  @media (${viewportDevice.mobile}) {
    padding-left: 0px;
  }

  @media (${viewportDevice.desktop}) {
    padding-left: 10px;
  }
`
const StyledCheckboxInput = styled.input`
  width: 20px;
  height: 20px;
`

const StyledCheckboxLabel = styled.label`
  color: #457b9d;
  display: flex;
  flex-wrap: nowrap;
  padding-top: 5px;

  @media (${viewportDevice.mobile}) {
    font-size: 16px;
  }

  @media (${viewportDevice.desktop}) {
    font-size: 23px;
  }
`
