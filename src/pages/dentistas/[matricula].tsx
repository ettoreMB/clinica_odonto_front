import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { api } from "../../lib/axios"


type DentistaProps = {
  nome: string,
  matricula: string
}

export default function Dentista() {
  const router =  useRouter()
  const { matricula } = router.query
  const [dentista, setDentista] = useState<DentistaProps>({
    nome: "",
    matricula: ""
  })
  

  useEffect(() => {
    if(!router.isReady) return
    const  getDentista= async(id: string | string[] | undefined)=> {
      const response =  await api.get(`dentistas/${id}`)
      console.log(response.data)
      setDentista(response.data)
     }
     getDentista(matricula)
  },[router.isReady])


  return (
    <div>
      {matricula == null  ? 
      (<h1>Loading</h1>) : 
      (
        <>
          <h1>{dentista?.nome}</h1>
          <h1>{dentista?.matricula}</h1>
        </>
      )
      }
      
    </div>
  )
}