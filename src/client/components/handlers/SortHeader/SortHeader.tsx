import TableHeaderContainer from '../../elements/Container/TableHeaderContainer'
import SimpleTableHeader from '../../typography/headings/SimpleTableHeader'
import Label from '../../elements/Label/Label'
import { InputType, SortDirection } from '../../../../model/Card'

type SortHeaderProps = {
  sortType: InputType
  sortDirection: SortDirection
  handleSortSelection: (type: InputType) => void
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const sortableTypes: InputType[] = ['front', 'back']

export default function SortHeader(props: Readonly<SortHeaderProps>) {
  return (
    <SimpleTableHeader>
      <TableHeaderContainer>
        {sortableTypes.map(type => (
          <Label
            key={type}
            label={capitalize(type)}
            onClick={() => props.handleSortSelection(type)}
            isSorted={props.sortType === type}
            sortDirection={props.sortDirection}
          />
        ))}
      </TableHeaderContainer>
    </SimpleTableHeader>
  )
}
