import Container from '../../elements/Container/Container'
import TableHeader2 from '../../typography/headings/TableHeader2'
import Label from '../../elements/Label/Label'
import { InputType, SortDirection } from '../../../../api/CardContext'
import styled from 'styled-components'

type SortHeaderProps = {
  sortType: InputType
  sortDirection: SortDirection
  handleSortSelection: (type: InputType) => void
}

const HeaderContainer = styled(Container)`
  display: grid;
  grid-template-columns: 1fr 1fr 0.5fr 0.5fr;
  overflow: auto;
  column-gap: 15px;
  row-gap: 15px;
  padding: 15px 25px;
  padding-top: 10;
  padding-bottom: 0;
  align-items: center;
`

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const sortableTypes: InputType[] = ['front', 'back']

function SortHeader(props: Readonly<SortHeaderProps>) {
  return (
    <TableHeader2>
      <HeaderContainer>
      
      {sortableTypes.map(type => (
        <Label
          key={type}
          label={capitalize(type)}
          onClick={() => props.handleSortSelection(type)}
          isSorted={props.sortType === type}
          sortDirection={props.sortDirection}
        />
      ))}
      
      </HeaderContainer>
    </TableHeader2>
  )
}
export default SortHeader
