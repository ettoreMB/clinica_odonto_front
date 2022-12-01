import {  ReactNode, useCallback, useEffect, useState } from "react"
import { createContext } from "use-context-selector"
import { api } from "../lib/axios"

export interface Dentista {
  nome: string
  sobrenome: string
  matricula: string | string[] 
  nomeSobrenome?: string
}

interface DentistaProviderProps {
  children: ReactNode
}

interface CreateDentistaInput {
  nome: string
  sobrenome: string
  matricula: string
}

interface DentistaContextType {
  dentista: Dentista
  dentistas: Dentista[]
  isLoading: boolean
  fetchDentista:(matricula: string) =>Promise<void>
  createDentista:(data: CreateDentistaInput) => Promise<void>
  deleteDentista:(matricula: string | string[]) => Promise<void>
  updateDentista:(data: Dentista)=>Promise<void>
}

export const DentistaContext = createContext({} as DentistaContextType) 

export function DentistaProvider({children}: DentistaProviderProps) {
  const [dentistas, setDentistas] = useState<Dentista[]>([])
  const [dentista, setDentista] = useState<Dentista>({
    matricula: "",
    nome: "",
    sobrenome: "",
    nomeSobrenome: ""
  })
  const [isLoading, setIsLoanding] = useState(true)

  const fetchDentistas = useCallback(async () => {
    try {
      const response =  await api.get("dentistas")
      setDentistas(response.data)
    } catch(err) {
      setError({isError: true, message:"Erro ao carregar Lista"})
     
    } finally {
      setIsLoanding(false)
    }

  },[])
  const fetchDentista = useCallback(async (matricula: string) => {
    const response =  await api.get(`dentistas/${matricula}`)
    setDentista(response.data)
  },[])

  const createDentista = useCallback(async (data: CreateDentistaInput) => {
    const {nome, sobrenome, matricula} = data
    const response = await api.post('dentistas', {
      nome,
      sobrenome,
      matricula,

    })
    setDentistas((state) => [response.data, ...state])
  },[])

  const updateDentista = useCallback(async (data: Dentista) => {
    const {nome, sobrenome, matricula} = data
    console.log(data)
    const response = await api.patch('dentistas', {
      nome,
      sobrenome,
      matricula

    })
    setDentista(response.data)
  },[])
  const deleteDentista = useCallback(async (matricula: Dentista['matricula']) => {
    try {
      await api.delete(`dentistas/${matricula}`)
      fetchDentistas()
    } finally {
      setIsLoanding(false)
    }
  },[])

  useEffect(()=> {
    fetchDentistas()
  },[dentista])

  return (
    <DentistaContext.Provider value={{dentistas, dentista, fetchDentista, createDentista, deleteDentista,updateDentista, isLoading}}>
      {children}
    </DentistaContext.Provider>
  )
}