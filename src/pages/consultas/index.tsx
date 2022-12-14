import * as Dialog from '@radix-ui/react-dialog'
import { isAxiosError } from 'axios'
import {  useEffect } from "react"
import { toast, ToastContainer } from 'react-toastify'
import { useContextSelector } from 'use-context-selector'
import ConsultaForm from '../../components/Forms/consultasForm'
import Modal from '../../components/modal'
import Table from "../../components/table"
import { TableButton } from '../../components/table/styles'
import { ConsultaContext, CreateConsultaInput } from '../../contexts/ConsultaContextx'
import { convertDate } from '../../utils/convertDate'
import { withSSRAuth } from '../../utils/withSSRAuth'


export default function ListConsultas() {

  const {consultas, isLoading, error, createConsulta, deleteConsulta} = useContextSelector(ConsultaContext, (context) => {
    return context
  })

  async function handleDeleteConsulta(consultaId: number,rgPaciente : string, matriculaDentista: string  | string[]  ,dhConsulta: string ) {
    const splitDate = dhConsulta.split(" ")
    const getDate = splitDate[0].split("/")
    const newDate = `${getDate[2]}-${getDate[1]}-${getDate[0]}T${splitDate[1]}`
    
    // const newDhConsulta = `${}`
    const data = {
      consultaId: consultaId,
      dhConsulta: newDate,
      rgPaciente: rgPaciente,
      matriculaDentista: matriculaDentista,
    }
    try {
      await deleteConsulta(data)
      toast.success("Consulta excluida com sucesso")
    } catch(err) {
      isAxiosError(err) ? toast.error(err?.response?.data) : toast.error("Erro ao deletar consulta")
    }
  }

  useEffect(() => {
    consultas
  }, [consultas])

  if (isLoading) {
    return (<h1>Carregando</h1>)
  }

  if (error) {
    return (
      <h1>Erro ao carregar a pagina</h1>
    )
  }

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button>+ Consulta</button>
        </Dialog.Trigger>
        <Modal title='Cadastrar Novo Paciente'>
          <ConsultaForm />
        </Modal>
      </Dialog.Root>

      <Table>
        <thead>
          <tr>
            <th>Dia Consulta</th>
            <th>Paciente</th>
            <th>Dentista</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>

          {consultas?.map(consulta => (
            <tr key={consulta.dhConsulta}>
              <td>{consulta.dhConsulta}</td>
              <td>{consulta.paciente?.nome} {consulta.paciente?.sobrenome}</td>
              <td>{consulta.dentista?.nome}</td>
              <td>  
                <TableButton 
                  color="delete"
                  onClick={async () => await handleDeleteConsulta(consulta.consultaId, consulta.paciente.rg, consulta.dentista.matricula, consulta.dhConsulta)}
                 >
                  Cancelar
                </TableButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ToastContainer pauseOnHover={false} autoClose={800} position="bottom-right" />
    </>
  )
}

export const getServerSideProps = withSSRAuth(async(context) => {
  return {props: {}}
})