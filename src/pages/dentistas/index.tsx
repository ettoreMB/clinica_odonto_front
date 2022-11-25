
import { Router, useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"
import Table from "../../components/table"
import * as Dialog from '@radix-ui/react-dialog'
import { api } from "../../lib/axios"
import Modal from "../../components/modal"
import DentistaForm from "../../components/Forms/dentistaForm"
import { Button } from "../../styles/globals"
import { TableButton } from "../../components/table/styles"

export interface DentistaProps {
  nome: string,
  matricula: string
}

interface reqProps {
  matricula: string | string[] | undefined
}

export default function ListDentista() {

  const [dentistas, setDentistas] = useState<DentistaProps[]>([])
  const router = useRouter()

  function handleDentista(matricula: string){
    router.push(`/dentistas/${matricula}`)
  }

  async function handleDeleteDentista(matricula: string) {
    await api.delete(`dentistas/${matricula}`)
    const data = await getDentistas()
    setDentistas((prev)=> [prev,...data])
  }

  async function getDentistas() {
    const response =  await api.get("dentistas")
    return response.data
   }

  useEffect(() => {
    async function run() {
     const dentistas =  await getDentistas()
     setDentistas(dentistas)
     }
    run()
  },[dentistas])

    return ( 
        <>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button>+ Dentista</Button>
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
            {dentistas?.map(d => (
              <tr key={d.matricula}>
                <td>{d.nome}</td>
                <td>{d.matricula}</td>
                <td>
                    <TableButton
                      color="view"
                      onClick={()=> handleDentista(d.matricula)}
                    >
                      Ver
                    </TableButton>
                    <TableButton 
                    color="delete"
                    onClick={()=> handleDeleteDentista(d.matricula)}
                    >
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