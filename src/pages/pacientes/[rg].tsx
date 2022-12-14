/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useContextSelector } from "use-context-selector"
import { PacienteContext } from "../../contexts/PacientesContext"
import * as Dialog from '@radix-ui/react-dialog'
import Modal from "../../components/modal"
import PacienteForm from "../../components/Forms/pacienteForm"
import {  VStack } from "../../styles/globals"
import {Box}  from "../../styles/pages/pacientes"

export default function Paciente() {
  const router = useRouter()
  const { rg } = router.query

  const { fetchPaciente, paciente, isLoading } = useContextSelector(PacienteContext, (context) => {
    return context
  })

  useEffect(() => {
    if (!router.isReady) return
    fetchPaciente(String(rg))
  }, [])

  if (isLoading) {
    return <h1>Carregando</h1>
  }
  return (
    <>
     <Box>
          
            <strong>Paciente: <span>{paciente?.nome} {paciente?.sobrenome}</span></strong>
  
            <strong>RG: <span>{paciente?.rg}</span> </strong>
        

        {!paciente?.endereco ?
          "Endereco Não cadastrado" :
          (
            <>
              <Box>
                <VStack>
                  <strong>Endereço: </strong>
                  <span>{paciente?.endereco.logradouro}, </span>
                  <span>{paciente?.endereco.numero}, </span>
                  <span>{paciente?.endereco.bairro}, </span>
                  <span>{paciente?.endereco.cep}, </span>
                  <span>{paciente?.endereco.localidade}, </span>
                  <span>{paciente?.endereco.uf}</span>
                </VStack>
              </Box>

              <Box>
                <VStack>
                   
                </VStack>
              </Box>
            </>
          )
        }
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button>Editar Paciente</button>
          </Dialog.Trigger>
          <Modal title='Editar Paciente'>
            <PacienteForm data={paciente} />
          </Modal>
        </Dialog.Root>
        </Box>
    </>
  )
}