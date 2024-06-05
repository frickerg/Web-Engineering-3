import TableHeaderContainer from '../../elements/Container/TableHeaderContainer'
import TableHeader2 from '../../typography/headings/TableHeader2'
import Label from '../../elements/Label/Label'
import { InputType, SortDirection } from '../../../../api/CardContext'

type SortHeaderProps = {
  sortType: InputType
  sortDirection: SortDirection
  handleSortSelection: (type: InputType) => void
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const sortableTypes: InputType[] = ['front', 'back']

function SortHeader(props: Readonly<SortHeaderProps>) {
  return (
    <TableHeader2>
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
    </TableHeader2>
  )
}
export default SortHeader
