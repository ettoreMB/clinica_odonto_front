import { AxiosError, isAxiosError } from "axios"
import {  ReactNode, useCallback, useEffect, useState } from "react"
import { createContext } from "use-context-selector"
import { api } from "../lib/axios"
import Paciente from "../pages/pacientes/[rg]"


export interface Endereco {
  cep: string
  logradouro: string
  numero: string
  bairro: string
  localidade: string
  uf: string
}

export interface Paciente {
  nome: string
  sobrenome: string
  rg: string
  endereco: Endereco
  dataCadastro: string
}

interface PacienteProviderProps {
  children: ReactNode
}

interface CreatePacienteInput {
  nome: string
  sobrenome: string
  rg: string
  endereco: Endereco
}

interface PacienteContextType {
  pacientes: Paciente[]
  paciente: Paciente
  isLoading: boolean
  error: boolean
  fetchPacientes:() =>Promise<void>
  fetchPaciente:(rg: string | string []) =>Promise<void>
  createPaciente:(data: Paciente) => Promise<void>
  updatePaciente:(data: CreatePacienteInput) => Promise<void>
  deletePaciente:(rg: string | string []) => Promise<void>
}

export const PacienteContext = createContext({} as PacienteContextType) 

export function PacienteProvider({children}: PacienteProviderProps) {
  const [pacientes, setPacientes] = useState<Paciente[]>([])

  const [paciente, setPaciente] = useState<Paciente>({
    nome: "",
    sobrenome: "",
    dataCadastro: "",
    rg: "",
    endereco: {
      bairro: "",
      cep: "",
      localidade: "",
      logradouro: "",
      numero: "",
      uf: ""
    }
  })
  
  const [isLoading, setIsLoanding] = useState(true)

  const [error, setError] = useState(false)

  const fetchPacientes = useCallback(async () => {
    try {
      const response =  await api.get("pacientes")
      setPacientes(response.data)
    } catch(err) {
      setError(true)
    }finally {
      setIsLoanding(false)
    }
    
  },[])

  const fetchPaciente = useCallback(async (rg: string  | string[]) => {
    try {
      const response =  await api.get(`pacientes/${rg}`)
      setPaciente(response.data)
    } catch(err) {
      setError(true)
    }finally {
      setIsLoanding(false)
    }
    
  },[])

  const createPaciente = useCallback(async (data: CreatePacienteInput) => {
    const paciente = {
      nome: data.nome, 
      sobrenome: data.sobrenome, 
      rg: data.rg,
      endereco :{
        bairro: data.endereco.bairro,
        cep: data.endereco.cep,
        localidade: data.endereco.localidade,
        logradouro: data.endereco.logradouro,
        numero: data.endereco.numero,
        uf: data.endereco.uf
      }
    } = data
    const response = await api.post('pacientes', paciente)
    setPacientes((state) => [response.data, ...state])
  },[])

  const updatePaciente = useCallback(async (data: CreatePacienteInput) => {
    const paciente = {
      nome: data.nome, 
      sobrenome: data.sobrenome, 
      rg: data.rg, 
      endereco :{
        bairro: data.endereco.bairro,
        cep: data.endereco.cep,
        localidade: data.endereco.localidade,
        logradouro: data.endereco.logradouro,
        numero: data.endereco.numero,
        uf: data.endereco.uf
      }
    } = data
      try {
        const response = await api.patch('pacientes', paciente)
        setPaciente(response.data)
      } finally {
        setIsLoanding(false)
      }
    
  },[])

  const deletePaciente =  useCallback(async(rg: string | string[]) => {
    try {
      const response = await api.delete(`dentistas/${rg}`)
      setPacientes((state) => [response.data, ...state])
    } finally {
      setIsLoanding(false)
    }
  },[])

  useEffect(()=> {
    fetchPacientes()
    setError(false)
  },[paciente])

  return (
    <PacienteContext.Provider value={{pacientes,paciente,error, fetchPacientes, createPaciente,updatePaciente, isLoading, deletePaciente, fetchPaciente}}>
      {children}
    </PacienteContext.Provider>
  )
}