import * as Dialog from '@radix-ui/react-dialog'
import { ReactNode } from 'react'
import { CloseButton, Content, Overlay } from './styles'


interface ModalProps {
  children: ReactNode
  title: string
}
export default function Modal({children,title}:ModalProps) {
  return (
    <Dialog.Portal>
      <Overlay>
        <Content>
          <Dialog.Title>{title}</Dialog.Title>
          <CloseButton>
            X
          </CloseButton>

          {children}
        </Content>
      </Overlay>
    </Dialog.Portal>
  )
}