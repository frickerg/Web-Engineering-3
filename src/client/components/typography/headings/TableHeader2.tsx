import styled from 'styled-components'

type TableHeader2Props = {
  children: React.ReactNode;
}

const StyledTableHeader2 = styled.h3`
  font-weight: bold;
  padding-top: 10;
  padding-bottom: 0;
`

function TableHeader2(props: Readonly<TableHeader2Props>) {
  return (
    <StyledTableHeader2>
      {props.children}
    </StyledTableHeader2>
  )
}

export default TableHeader2