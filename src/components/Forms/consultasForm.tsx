import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContextSelector } from 'use-context-selector'
import { Consulta, ConsultaContext } from '../../contexts/ConsultaContextx'
import { useRouter } from 'next/router'

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAxiosError } from "axios"
import { VStack } from '../../styles/globals'
import { Dentista, DentistaContext } from '../../contexts/DentistaContextx'
import { PacienteContext } from '../../contexts/PacientesContext'
import { any } from 'zod'

const newConsultaFormSchema = zod.object({
  dhConsulta: zod.string(),
  rgPaciente: zod.string(),
  matriculaDentista: zod.string() ,
})

type NewConsultaFormInputs = zod.infer<typeof newConsultaFormSchema>

interface ConsultaFormProps {
  data?: Consulta
}

export default function ConsultaForm({ data }: ConsultaFormProps) {
  const router = useRouter()
  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<NewConsultaFormInputs>({
    resolver: zodResolver(newConsultaFormSchema)
  })
  const dentistas = useContextSelector(DentistaContext, (constext) => {
    return constext.dentistas
  })

  const pacientes = useContextSelector(PacienteContext, (constext) => {
    return constext.pacientes
  })
  const { createConsulta } = useContextSelector(ConsultaContext, (context) => {
    return context
  })

  async function handleCreateConsulta(data: NewConsultaFormInputs) {
    const { dhConsulta,matriculaDentista,rgPaciente } = data
    console.log(data)
    // try {
    // } catch (err) {
    //   isAxiosError(err) ? toast.error(err?.response?.data) : toast.error("Erro ao editar o consulta")
    // }

  }

  return (
    <>
      <form onSubmit={handleSubmit(handleCreateConsulta)}>
        <input type="datetime-local" {...register("dhConsulta")}/>
        <label>Dentista:</label>
        <select  {...register("matriculaDentista")}>
        <option   selected >Selecione uma dentista</option>
          {dentistas?.map((dentista)  => (
            <option  
              key={String(dentista.matricula)} 
              value={dentista.matricula}>{dentista.nome}
            </option>
          ))}
        </select>

        <label>Paciente:</label>
        <select {...register("rgPaciente")}>
        <option   selected >Selecione uma paciente</option>
          {pacientes?.map((paciente)  => (
            <option  key={paciente.rg} value={paciente.rg}>{paciente.nome}</option>
          ))}
        </select>
          <button type='submit' >
            Criar consulta
          </button>

      </form>
    </>
  )
}