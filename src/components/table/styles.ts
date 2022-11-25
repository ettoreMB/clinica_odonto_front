import { styled } from "@stitches/react";

export const TableContainer = styled('table', {
  width: '100%',
  thead: {
    backgroundColor: '$green500',
    textAlign: 'left',
    color: 'white',
    tr: {
    },
    th: {
      borderRadius: '8px',
      padding: '0.3rem 0.5rem'
    },
    'th:last-child': {
      textAlign: 'center'
    }
  },
  tbody: {
    tr:{
     
    },
    'td:last-child':{
      textAlign: 'center'
    },
    'tr:nth-child(even)': {
      backgroundColor: '#f2f2f2',
    },
    td:{
      paddingLeft: '0.3rem',
    },
  }
})

export const TableButton = styled('button', {
    variants: {
      color: {
        delete: {
          backgroundColor: '$red'
        },
        view: {
          backgroundColor: '$yellow'
        }
      }
    },
    marginLeft:'0.3rem',
    padding: '5px 15px',
    border: 'none',
    textAlign: 'center',
    borderRadius: '6px',
    backgroundColor: '$gray300',
    '&:hover': {
      backgroundColor: '$gray500',
    }
  
})