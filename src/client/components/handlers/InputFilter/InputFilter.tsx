import Input from '../../elements/Input/Input'
import Button from '../../elements/Button/Button'
import Checkbox from '../../elements/Checkbox/Checkbox'
import Container from '../../elements/Container/Container'
import { InputType } from '../../../../api/CardContext'
import styled from 'styled-components'

type InputFilterProps = {
  front: string
  back: string
  filterChecked: boolean
  handleInputChange: (inputType: InputType, value: string) => void
  handleAddNewCard: (front: string, back: string) => void
  handleCheckboxChange: (checked: boolean) => void
}

const InputFilterButton = styled(Button)`
  grid-area: input-button;
`

const InputFilterCheckbox = styled(Checkbox)`
  grid-area: input-checkbox;
`

const InputFilterContainer = styled(Container)`
  display: grid;
  grid-template-columns: 1fr 1fr 18%;
  grid-template-rows: auto auto;
  overflow: auto;
  column-gap: 15px;
  row-gap: 15px;
  padding: 15px 25px;
  align-items: center;
  grid-template-areas:
    'input-front input-back input-button'
    'spacer spacer input-checkbox';
`

const InputFilterFrontInput = styled(Input)`
 grid-area: input-front;
`
const InputFilterBackInput = styled(Input)`
  grid-area: input-back;
`

function InputFilter(props: Readonly<InputFilterProps>) {
  return (
    <InputFilterContainer className="input-container">
      <InputFilterFrontInput
        className="input-front"
        key="front"
        value={props.front}
        placeholder="Front"
        handleInputChange={value => props.handleInputChange('front', value)}
      />
      <InputFilterBackInput
        className="input-back"
        key="back"
        value={props.back}
        placeholder="Back"
        handleInputChange={value => props.handleInputChange('back', value)}
      />
      <InputFilterButton
        className="input-button"
        label="Add"
        onClick={() => props.handleAddNewCard(props.front, props.back)}
      />
      <InputFilterCheckbox
        className="input-checkbox"
        id="filter"
        label="Filter Table"
        checked={props.filterChecked}
        onChange={props.handleCheckboxChange}
      />
    </InputFilterContainer>
  )
}

export default InputFilter
