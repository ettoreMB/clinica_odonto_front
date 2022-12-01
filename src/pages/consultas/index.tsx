import * as Dialog from '@radix-ui/react-dialog'
import { useRouter } from "next/router"
import {  useEffect } from "react"
import { useContextSelector } from 'use-context-selector'
import PacienteForm from '../../components/Forms/pacienteForm'
import Modal from '../../components/modal'
import Table from "../../components/table"
import { TableButton } from '../../components/table/styles'
import { ConsultaContext } from '../../contexts/ConsultaContextx'
import { convertDate } from '../../utils/convertDate'


export default function ListConsultas() {

  const {consultas, isLoading, error, deleteConsulta} = useContextSelector(ConsultaContext, (context) => {
    return context
  })

  const router = useRouter()

  function handlePacientes(rg: string) {
    router.push(`/pacientes/${rg}`)
  }
  
  useEffect(() => {
    consultas
  }, [consultas])

  if (isLoading) {
    return (<h1>Carregando</h1>)
  }

  if (error.isError) {
    return (
      <h1>{error.message}</h1>
    )
  }

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button>+ Paciente</button>
        </Dialog.Trigger>
        <Modal title='Cadastrar Novo Paciente'>
          <PacienteForm />
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
              <td>{convertDate(consulta.dhConsulta)}</td>
              <td>{consulta.paciente.nome}</td>
              <td>{consulta.dentista.nome}</td>
              <td>
                <TableButton
                  color="view"
                  onClick={() => handlePacientes(consulta.dhConsulta)}
                >
                  Ver
                </TableButton>
                <TableButton color="delete" >
                  Deletar
                </TableButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

