import styled from 'styled-components'

type CheckboxProps = {
  id: string
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  className?: string
}

const StyledCheckbox = styled.div`
  padding-left: 10px;
  padding-bottom: 0;
`
const StyledCheckboxInput = styled.input`
  width: 20px;
  height: 20px;
`

const StyledCheckboxLabel = styled.label`
  font-size: 23px;
  padding-left: 5px;
  color: #457b9d;
`

function Checkbox(props: Readonly<CheckboxProps>) {
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
      <StyledCheckboxLabel htmlFor={`${props.id}-checkbox`}>{props.label}
      </StyledCheckboxLabel>
    </StyledCheckbox>
  )
}

export default Checkbox
