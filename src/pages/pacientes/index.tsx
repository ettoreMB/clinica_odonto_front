import * as Dialog from '@radix-ui/react-dialog'
import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"
import PacienteForm from '../../components/Forms/pacienteForm'
import Modal from '../../components/modal'
import Table from "../../components/table"
import { TableButton } from '../../components/table/styles'

import { api } from "../../lib/axios"
import { Button } from '../../styles/globals'

interface Paciente {
  id: number
  nome: string
  sobrenome: string
  rg: string
  dataCadastro: string
  
}

export default function ListPacientes() {

  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const router = useRouter()

  function handlePacientes(rg: string){
    router.push(`/pacientes/${rg}`)
  }
  async function getPacientes () {
    const response =  await api.get("pacientes")
    return response.data
   }
  useEffect(() => {
    async function run() {
      const response =  await getPacientes()
      setPacientes(response)
     }
     run()
  },[])

  
    return ( 
      <>
       
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button>+ Paciente</Button>
          </Dialog.Trigger>
          <Modal title='Cadastrar Novo Paciente'>
            <PacienteForm />
          </Modal>
        </Dialog.Root>
        
        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Sobrenome</th>
              <th>DataCadastro</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
          {pacientes?.map(d => (
            <tr key={d.id}>
              <td>{d.nome}</td>
              <td>{d.sobrenome}</td>
              <td>{d.dataCadastro}</td>
              <td>
                <TableButton
                  color="view"
                  onClick={()=> handlePacientes(d.rg)}
                >
                  Ver
                </TableButton>
                <TableButton color="delete">
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