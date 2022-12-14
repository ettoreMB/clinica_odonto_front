/* eslint-disable react-hooks/exhaustive-deps */

import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import * as Dialog from '@radix-ui/react-dialog'
import Modal from "../../components/modal"
import { useContextSelector } from "use-context-selector"
import DentistaForm from "../../components/Forms/dentistaForm"
import { DentistaContext } from "../../contexts/DentistaContextx"
import { Box, Container } from "../../styles/pages/dentistas"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAxiosError } from "axios"
import { VStack } from "../../styles/globals"

export default function Dentista() {
  const router = useRouter()
  const { matricula } = router.query

  const { dentista, fetchDentista, isLoading } = useContextSelector(DentistaContext, (context) => {
    return context
  })
  console.log(dentista)
  useEffect(() => {
    if (!router.isReady) return
    fetchDentista(String(matricula))
  }, [router.isReady])

  if (isLoading) {
    return (<h1>Loading</h1>)
  }

  return (

    <Container>
      <VStack>
        <Box>
          <strong>Nome :</strong>
          <p>{dentista.nome}</p>
        </Box>

        <Box>
          <strong>Sobrenome :</strong>
          <p>{dentista.sobrenome}</p>
        </Box>

        <Box>
          <strong>Matricula :</strong>
          <p>{dentista.matricula}</p>
        </Box>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button>Editar Dentista</button>
          </Dialog.Trigger>
          <Modal title='Editar Dentista'>
            <DentistaForm data={dentista} />
          </Modal>
        </Dialog.Root>
      </VStack>
      <ToastContainer pauseOnHover={false} autoClose={800} position="bottom-right" />
    </Container>
  )
}