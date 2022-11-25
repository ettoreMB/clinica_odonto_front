
import { ReactNode } from 'react'
import {TableContainer}from './styles' 
interface TableProps {
  children: ReactNode
}
export default function Table({children}:TableProps) {
  return(
    <TableContainer>
      {children}
    </TableContainer>
  )
}