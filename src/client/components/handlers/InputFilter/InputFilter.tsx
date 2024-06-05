import InputFilterFront from './InputFilterFront'
import InputFilterBack from './InputFilterBack'
import InputFilterButton from '../../elements/Button/InputFilterButton'
import InputFilterCheckbox from '../../elements/Checkbox/InputFilterCheckbox'
import InputFilterContainer from '../../elements/Container/InputFilterContainer'
import { InputType } from '../../../../api/CardContext'

type InputFilterProps = {
  front: string
  back: string
  filterChecked: boolean
  handleInputChange: (inputType: InputType, value: string) => void
  handleAddNewCard: (front: string, back: string) => void
  handleCheckboxChange: (checked: boolean) => void
}

function InputFilter(props: Readonly<InputFilterProps>) {
  return (
    <InputFilterContainer>
      <InputFilterFront
        key="front"
        value={props.front}
        placeholder="Front"
        handleInputChange={value => props.handleInputChange('front', value)}
      />
      <InputFilterBack
        key="back"
        value={props.back}
        placeholder="Back"
        handleInputChange={value => props.handleInputChange('back', value)}
      />
      <InputFilterButton
        label="Add"
        onClick={() => props.handleAddNewCard(props.front, props.back)}
      />
      <InputFilterCheckbox
        id="filter"
        label="Filter Table"
        checked={props.filterChecked}
        onChange={props.handleCheckboxChange}
      />
    </InputFilterContainer>
  )
}

export default InputFilter
