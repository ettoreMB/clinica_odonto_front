
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import Table from "../../components/table"
import Modal from "../../components/modal"
import DentistaForm from "../../components/Forms/dentistaForm"
import { TableButton } from "../../components/table/styles"
import { DentistaContext } from "../../contexts/DentistaContextx"
import { useContextSelector } from "use-context-selector"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as Dialog from '@radix-ui/react-dialog'
import { isAxiosError } from "axios"

export default function ListDentista() {

  const { isLoading, dentistas, error, deleteDentista } = useContextSelector(DentistaContext, (context) => {
    return context
  })


  const router = useRouter()

  function handleDentista(matricula: string | string[]) {
    router.push(`dentistas/${matricula}`)
  }
  
  async function handleDelete(matricula: any) {
    try {
      await deleteDentista(matricula)
      toast.success("Dentista deletado com sucesso")
    } catch (err) {
      isAxiosError(err) ? toast.error(err?.response?.data) : toast.error("Erro ao excluir o dentista")

    }
  }

  useEffect(() => { dentistas }, [dentistas])

  if (isLoading) {
    return <h1>Loading</h1>
  }

  if(error) {
    return <h1>Erro ao carregar a pagina</h1>
  }
  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button>+ Dentista</button>
        </Dialog.Trigger>
        <Modal title='Cadastrar Novo Paciente'>
          <DentistaForm />
        </Modal>
      </Dialog.Root>
      <Table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Matricula</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {dentistas?.map(dentista => (
            <tr key={String(dentista.matricula)}>
              <td>{dentista.nomeSobrenome}</td>
              <td>{dentista.matricula}</td>

              <td>
                <TableButton
                  color="view"
                  onClick={() => handleDentista(dentista.matricula)}
                >
                  Ver
                </TableButton>

                <TableButton
                  color="delete"
                  onClick={() => handleDelete(dentista.matricula)}
                >
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

