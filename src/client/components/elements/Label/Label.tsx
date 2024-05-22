import { SortDirection } from '../../layouts/Content/Content'
import './Label.css'

type LabelProps = {
  label: string
  isSorted?: boolean
  sortDirection?: SortDirection
  onClick?: () => void
  className?: string
}

function Label(props: Readonly<LabelProps>) {
  return (
    <div className={`label ${props.className}`} onClick={props.onClick}>
      {props.label}{' '}
      {props.isSorted ? (props.sortDirection === 'asc' ? '▲' : '▼') : ''}
    </div>
  )
}

export default Label
