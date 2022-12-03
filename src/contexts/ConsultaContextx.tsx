import { isAxiosError } from "axios"
import {  ReactNode, use, useCallback, useEffect, useState } from "react"
import { createContext } from "use-context-selector"
import { api } from "../lib/axios"
import { Dentista } from "./DentistaContextx"
import { Paciente } from "./PacientesContext"


export interface Consulta {
 dhConsulta: string
  paciente: Paciente
  dentista: Dentista
}

interface ConsultaProviderProps {
  children: ReactNode
}

export interface CreateConsultaInput {
  dhConsulta: string
  rgPaciente: string
  matriculaDentista: string
}

interface ConsultaContextType {
  consultas: Consulta[]
  isLoading: boolean
  error: boolean
  fetchConsultas:() =>Promise<void>
  createConsulta:(data: CreateConsultaInput) => Promise<void>
  deleteConsulta:(id: number) => Promise<void>
}

export const ConsultaContext = createContext({} as ConsultaContextType) 

export function ConsultaProvider({children}: ConsultaProviderProps) {
  const [consultas, setConsultas] = useState<Consulta[]>([])
  const [isLoading, setIsLoanding] = useState(true)
  const [error, setError] = useState(false)
  const fetchConsultas = useCallback(async () => {
    try {
      const response =  await api.get("consultas")
      setConsultas(response.data)
    } catch(err) {
      setError({isError: true, message:"Erro ao carregar Lista"})
     
    } finally {
      setIsLoanding(false)
    }

  },[])

  const createConsulta = useCallback(async (data: CreateConsultaInput) => {
    const {dhConsulta,matriculaDentista,rgPaciente} = data
      const response = await api.post('consultas', {
        dhConsulta,
        matriculaDentista,
        rgPaciente
      })
      setConsultas((state) => [response.data, ...state])
  },[])

  const deleteConsulta = useCallback(async (id: number) => {
      const response = await api.delete(`consultas/${id}`)
      setConsultas((state) => [response.data, ...state])
  },[])

  useEffect(()=> {
    fetchConsultas()
  },[])

  return (
    <ConsultaContext.Provider value={{consultas, fetchConsultas, createConsulta, deleteConsulta, isLoading, error}}>
      {children}
    </ConsultaContext.Provider>
  )
}