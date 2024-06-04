import { SortDirection } from '../../../../api/CardContext'
import styled from 'styled-components'

type LabelProps = {
  label: string
  isSorted?: boolean
  sortDirection?: SortDirection
  onClick?: () => void
  className?: string
}

const StyledLabel = styled.label`
  font-weight: bold;
  padding-top: 0;
  padding-bottom: 0;
`

function Label(props: Readonly<LabelProps>) {
  return (
    <StyledLabel className={props.className} onClick={props.onClick}>
      {props.label}{' '}
      {props.isSorted ? (props.sortDirection === 'asc' ? '▲' : '▼') : ''}
    </StyledLabel>
  )
}

export default Label
