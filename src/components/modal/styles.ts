import { styled } from "@stitches/react";
import * as Dialog from '@radix-ui/react-dialog'


export const Overlay = styled(Dialog.Overlay,{
  position: "fixed",
  width: "100vw",
  height: "100vh",
  inset:" 0",
  background:"rgba(0, 0, 0, 0.75)"
  })

export const Content = styled(Dialog.Content, {
  minWidth: '32rem',
  width: 'fit-content',
  borderRadius: '8px',
  padding: '2rem 3rem',
  position: 'fixed',
  top: '50%',
  left:'50%',
  transform: "translate(-50%, -50%)",
  background: "white",
  form: {
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  }

})

export const CloseButton = styled(Dialog.Close, {
  position: 'absolute',
  background:'transparent',
  border: '0',
  top: '1.5rem',
  right: '1.5rem',
  lineHeight: '0',
  cursor: 'pointer',
  color: 'black',

  '&:hover': {
    background: 'transparent',
  }
})