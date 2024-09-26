import { TableHeaderContainer } from '../../elements/Container/components/TableHeaderContainer'
import { SimpleTableHeader } from '../../typography/headings/SimpleTableHeader'
import { Label } from '../../elements/Label/Label'
import { InputType, SortDirection } from '../../../common/types'

type SortHeaderProps = {
  sortType: InputType
  sortDirection: SortDirection
  handleSortSelection: (type: InputType) => void
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const sortableTypes: InputType[] = ['front', 'back']

export default function SortHeader(props: Readonly<SortHeaderProps>) {
  const getSortIndicator = (type: InputType) => {
    if (props.sortType !== type) return ''
    return props.sortDirection === 'asc' ? '▲' : '▼'
  }

  return (
    <SimpleTableHeader>
      <TableHeaderContainer>
        {sortableTypes.map(type => (
          <Label key={type} onClick={() => props.handleSortSelection(type)}>
            {capitalize(type)} {getSortIndicator(type)}
          </Label>
        ))}
      </TableHeaderContainer>
    </SimpleTableHeader>
  )
}
