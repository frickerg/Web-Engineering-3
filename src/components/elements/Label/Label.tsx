import './Label.css'

type LabelProps = {
  label: string
  isSorted: boolean
  sortDirection: number
  onClick: () => void
}

function Label(props: LabelProps) {
  return (
    <div className="label" onClick={props.onClick}>
      {props.label}{' '}
      {props.isSorted ? (props.sortDirection === 1 ? '▲' : '▼') : ''}
    </div>
  )
}

export default Label
