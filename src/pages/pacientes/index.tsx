import * as Dialog from '@radix-ui/react-dialog'
import { useRouter } from "next/router"
import {  useEffect, useState } from "react"
import { useContextSelector } from 'use-context-selector'
import PacienteForm from '../../components/Forms/pacienteForm'
import Modal from '../../components/modal'
import Table from "../../components/table"
import { TableButton } from '../../components/table/styles'
import { PacienteContext } from '../../contexts/PacientesContext'
import { convertDate } from '../../utils/convertDate'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAxiosError } from 'axios'
import { Half1Icon } from '@radix-ui/react-icons'

export default function ListPacientes() {

  const {pacientes, isLoading,error, deletePaciente} = useContextSelector(PacienteContext, (context) => {
    return context
  })

  const router = useRouter()

  function handlePacientes(rg: string) {
    router.push(`/pacientes/${rg}`)
  }
  
  async function handleDelete(rg: string) {
    try {
      await deletePaciente(rg)
      toast.success("paciente deletado com sucesso")
    } catch (err) {
      isAxiosError(err) ? toast.error(err?.response?.data) : toast.error("Erro ao excluir o paciente")
    }
  }

  useEffect(() => {
    pacientes
  }, [pacientes])

  if (isLoading) {
    return (<h1>Carregando</h1>)
  }

  if(error) {
    return <h1>Erro ao carregar a pagina</h1>
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
            <th>Nome</th>
            <th>DataCadastro</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>

          {pacientes?.map(d => (
            <tr key={d.rg}>
              <td>{d.nome} {d.sobrenome}</td>
              <td>{convertDate(d.dataCadastro)}</td>
              <td>
                <TableButton
                  color="view"
                  onClick={() => handlePacientes(d.rg)}
                >
                  Ver
                </TableButton>
                <TableButton color="delete" onClick={async() => handleDelete(d.rg)}>
                  Deletar
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

