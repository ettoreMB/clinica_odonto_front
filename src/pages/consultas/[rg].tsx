import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { api } from "../../lib/axios"


type PacienteProps = {
  nome: string,
  sobrenome: string,
  rg: string,
  dataCadatro: string
  endereco : {
    cep: string
    logradouro: string
    numero: string
    bairro: string
    localidade: string
    uf: string
  }
}

export default function Consulta() {
  const router =  useRouter()
  const { rg } = router.query
  const [paciente, setPaciente] = useState<PacienteProps>()
  

  useEffect(() => {
    if(!router.isReady) return
    const  getPaciente= async(rg: string | string[] | undefined)=> {
      const response =  await api.get(`pacientes/${rg}`)
      setPaciente(response.data)
     }
     console.log(paciente)
     getPaciente(rg)
  },[router.isReady])


  return (
    <div>
      {rg == null  ? 
      (<h1>Loading</h1>) : 
      (
        <>
          <h1>{paciente?.nome}</h1>
          <h1>{paciente?.sobrenome}</h1>
          <h1>{paciente?.rg}</h1>
          {!paciente?.endereco ? 
            "Endereco Não cadastrado": 
            (
            <>
              <h1>{paciente?.endereco.logradouro}</h1>
              <h1>{paciente?.endereco.bairro}</h1>
              <h1>{paciente?.endereco.numero}</h1>
            </>
            )
          }
        </>
      )
      }
      
    </div>
  )
}