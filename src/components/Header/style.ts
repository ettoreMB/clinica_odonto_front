import { styled } from "../../styles";

export const Container = styled('header', {
  padding: '2rem 2rem',
  width: '100%',
  margin: '0 auto',
  display:'inline-flex',
  backgroundColor: '$white',
  justifyContent: 'space-between'
})

export const LinkNav = styled('div', {
  maxWidth: '100%',
  display: 'flex',
  gap: '3rem',

  a:{
    textDecoration: 'none'
  }
})

export const LoginButton = styled('button', {
  padding: '0.6rem 1.5rem',
  borderRadius: '8px',
  border: 'none',

  '&:hover': {
    backgroundColor: '$gray300'
  }
})
