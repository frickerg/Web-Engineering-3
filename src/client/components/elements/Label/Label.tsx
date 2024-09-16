import styled from 'styled-components'
import { SortDirection } from '../../../common/types'

type LabelProps = {
  label: string
  isSorted?: boolean
  sortDirection?: SortDirection
  onClick?: () => void
  className?: string
}

export default function Label(props: Readonly<LabelProps>) {
  const getSortIndicator = (): string => {
    if (props.isSorted) {
      return props.sortDirection === 'asc' ? '▲' : '▼'
    } else {
      return ''
    }
  }

  return (
    <StyledLabel className={props.className} onClick={props.onClick}>
      {props.label} {getSortIndicator()}
    </StyledLabel>
  )
}

const StyledLabel = styled.label`
  font-weight: bold;
  padding-top: 0;
  padding-bottom: 0;
`
