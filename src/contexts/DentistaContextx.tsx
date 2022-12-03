import {  ReactNode, SetStateAction, useCallback, useEffect, useState } from "react"
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
  error: boolean
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

  const [error, setError] = useState(false)
  const fetchDentistas = useCallback(async () => {
    try {
      const response =  await api.get("dentistas")
      setDentistas(response.data)
    } catch(err) {
      setError(true)
      
    } finally {
      setIsLoanding(false)
    }

  },[])

  const fetchDentista = useCallback(async (matricula: string) => {
    try {
      const response =  await api.get(`dentistas/${matricula}`)
    setDentista(response.data)
    } catch (error) {
      setError(true)
    } finally {
      setIsLoanding(false)
    }
    
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
      await api.delete(`dentistas/${matricula}`)
      fetchDentistas()
  },[])

  useEffect(()=> {
    fetchDentistas()
  },[dentista])

  return (
    <DentistaContext.Provider value={{dentistas, dentista,error, fetchDentista, createDentista, deleteDentista,updateDentista, isLoading}}>
      {children}
    </DentistaContext.Provider>
  )
}