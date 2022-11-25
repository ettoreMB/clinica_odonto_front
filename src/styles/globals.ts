import { globalCss, styled } from ".";

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },

  body: {
    '-webkit-font-smoothing': 'antialised',
    backgroundColor: '$gray100',
    color: '$gray900'
  },

  'body, input, text-area, button': {
    fontFamily: 'Roboto',
    fontWeight: 400
  }
})

export const Container = styled('div', {
  margin: '0 auto',
  maxWidth: '1290px',
  padding: '2rem 2rem',
})

export const Wrapper = styled('main', {
    minWidth: '100%',
    margin: '0 auto',
})

export const Button = styled('button', {
  backgroundColor: '$green300',
  borderRadius: '8px',
  fontSize: '13px',
  padding: '16px',
  fontWeight: 'bold',
  color: 'white',
  border: '0',
  '&:hover': {
    backgroundColor: '$green500',
  },
})


