import { SortDirection } from '../../layouts/Content/Content'
import './Label.css'

type LabelProps = {
  label: string
  isSorted: boolean
  sortDirection: SortDirection
  onClick: () => void
}

function Label(props: LabelProps) {
  return (
    <div className="label" onClick={props.onClick}>
      {props.label}{' '}
      {props.isSorted ? (props.sortDirection === 'asc' ? '▲' : '▼') : ''}
    </div>
  )
}

export default Label
