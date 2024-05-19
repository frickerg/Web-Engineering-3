import './SortHeader.css'
import Label from '../../elements/Label/Label'
import { InputType, SortDirection } from '../../layouts/Content/Content'

type SortHeaderProps = {
  sortType: InputType
  sortDirection: SortDirection
  handleSortSelection: (type: InputType) => void
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const sortableTypes: InputType[] = ['front', 'back']

function SortHeader(props: SortHeaderProps) {
  return (
    <div className="header header-container">
      {sortableTypes.map(type => (
        <Label
          key={type}
          label={capitalize(type)}
          onClick={() => props.handleSortSelection(type)}
          isSorted={props.sortType === type}
          sortDirection={props.sortDirection}
        />
      ))}
    </div>
  )
}
export default SortHeader
