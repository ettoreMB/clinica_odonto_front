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
    color: '$gray800'
  },

  'body, input, text-area, button': {
    fontFamily: 'Roboto',
    fontWeight: 400
  },

  input: {
    border: 0,
    fontWeight: 'bold',
    borderRadius: '8px',
    backgroundColor: '$gray50',
    padding: '1rem',
    width: '100%',
    '&:disabled': {
      backgroundColor: '$gray300',
      color: '$gray500'
    },
    '&:read-only':
    {
      backgroundColor: '$gray300',
      color: '$gray500'
    }
  },

  button: {
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
    '&:disabled': {
      opacity: '0.7',
      cursor: 'not-allowed',
      backgroundColor: '$gray800'
    }
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

export const HStack = styled('div', {
  display: 'flex',
  flexDirection: 'column'
})

export const VStack = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  gap: '1rem',

})


