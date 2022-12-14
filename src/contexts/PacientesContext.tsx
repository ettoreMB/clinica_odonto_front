import { AxiosError, isAxiosError } from "axios"
import {  ReactNode, useCallback, useEffect, useState } from "react"
import { createContext } from "use-context-selector"
import { api } from "../lib/apiClient"
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
  dataCadastro?: string
  endereco: Endereco
  usuario: {
    password: string
  }
}

interface PacienteProviderProps {
  children: ReactNode
}

interface CreatePacienteInput {
  nome: string
  sobrenome: string
  rg: string
  endereco: Endereco
  usuario: {
    password: string 
  }
}

interface PacienteContextType {
  pacientes: Paciente[]
  paciente: Paciente
  isLoading: boolean
  error: boolean
  fetchPacientes:() =>Promise<void>
  fetchPaciente:(rg: string | string []) =>Promise<void>
  createPaciente:(data: CreatePacienteInput ) => Promise<void>
  updatePaciente:(data: CreatePacienteInput ) => Promise<void>
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
    },
    usuario: {
      password: ""
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
        cep: data.endereco.cep,
        logradouro: data.endereco.logradouro,
        numero: data.endereco.numero,
        bairro: data.endereco.bairro,
        localidade: data.endereco.localidade,
        uf: data.endereco.uf
      },
      usuario :{
        password: data.usuario.password
      }
    }
    const response = await api.post('pacientes', paciente)
    console.log(paciente)
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
       await api.delete(`pacientes/${rg}`)
      fetchPacientes()
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