import { useRouter } from "next/router"
import { useEffect } from "react"
import { useContextSelector } from "use-context-selector"
import { PacienteContext } from "../../contexts/PacientesContext"
import * as Dialog from '@radix-ui/react-dialog'
import Modal from "../../components/modal"
import PacienteForm from "../../components/Forms/pacienteForm"
import { HStack, VStack } from "../../styles/globals"
import { Box } from "./styles"

type PacienteProps = {
  nome: string,
  sobrenome: string,
  rg: string,
  dataCadatro: string
  endereco: {
    cep: string
    logradouro: string
    numero: string
    bairro: string
    localidade: string
    uf: string
  }
}

export default function Paciente() {
  const router = useRouter()
  const { rg } = router.query


  const { fetchPaciente, paciente, isLoading } = useContextSelector(PacienteContext, (context) => {
    return context
  })

  useEffect(() => {
    if (!router.isReady) return
    fetchPaciente(String(rg))
  }, [router.isReady])

  if (isLoading) {
    return <h1>Carregando</h1>
  }
  return (
    <div>
     <Box>
        <Box>
          <strong>Nome: <span>{paciente?.nome}</span></strong>
          <strong>Sobrenome: <span>{paciente?.sobrenome}</span> </strong>
          <strong>RG: <span>{paciente?.rg}</span> </strong>
        </Box>

        <h3>Endereço:</h3>
        {!paciente?.endereco ?
          "Endereco Não cadastrado" :
          (
            <>
              <Box>
                <VStack>
                  <strong>Rua: <span>{paciente?.endereco.logradouro}</span></strong>
                  <strong>Numero: {paciente?.endereco.numero}</strong>
                  <strong>Bairro: {paciente?.endereco.bairro}</strong>
                  <strong>CEP: {paciente?.endereco.cep}</strong>
                </VStack>
              </Box>

              <Box>
                <VStack>
                  <strong>Estado: <span>{paciente?.endereco.localidade}</span></strong>
                  <strong>UF: {paciente?.endereco.uf}</strong>
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
    </div>
  )
}