import './Checkbox.css'

type CheckboxProps = {
  id: string
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  className?: string
}

function Checkbox(props: Readonly<CheckboxProps>) {
  return (
    <div className={`checkbox ${props.className}`}>
      <input
        type="checkbox"
        name={props.id}
        value={props.id}
        id={`${props.id}-checkbox`}
        onChange={() => props.onChange(!props.checked)}
        checked={props.checked}
      />
      <label htmlFor={`${props.id}-checkbox`}>{props.label}</label>
    </div>
  )
}

export default Checkbox
