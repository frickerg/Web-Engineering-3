import { Fragment } from 'react'
import './InputFilter.css'
import { InputType } from '../../layouts/Content/Content'
import Input from '../../elements/Input/Input'
import Button from '../../elements/Button/Button'
import Checkbox from '../../elements/Checkbox/Checkbox'

type InputFilterProps = {
  front: string
  back: string
  filterChecked: boolean
  handleInputChange: (inputType: InputType, value: string) => void
  handleAddNewCard: () => void
  handleCheckboxChange: (checked: boolean) => void
}

function InputFilter(props: InputFilterProps) {
  return (
    <Fragment>
      <Input
        key="front"
        value={props.front}
        placeholder="Front"
        handleInputChange={value => props.handleInputChange('front', value)}
      />
      <Input
        key="back"
        value={props.back}
        placeholder="Back"
        handleInputChange={value => props.handleInputChange('back', value)}
      />
      <Button label="Save" onClick={props.handleAddNewCard} />
      <div />
      <div />
      <Checkbox
        id="filter"
        label="Filter Table"
        checked={props.filterChecked}
        onChange={props.handleCheckboxChange}
      />
    </Fragment>
  )
}

export default InputFilter
