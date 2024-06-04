import styled from 'styled-components'

type TableHeader1Props = {
  children: React.ReactNode;
}

const StyledTableHeader1 = styled.h3`
  font-weight: bold;
  background-color: #f0f0f0;
  padding: 10px;
  text-align: center;
`

function TableHeader1(props: Readonly<TableHeader1Props>) {
  return (
    <StyledTableHeader1>
      {props.children}
    </StyledTableHeader1>
  )
}

export default TableHeader1