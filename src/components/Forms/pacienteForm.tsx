import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { HStack, VStack } from '../../styles/globals'
import { useRouter } from 'next/router'
import { useContextSelector } from 'use-context-selector'
import { Paciente, PacienteContext } from '../../contexts/PacientesContext'

const newPacienteFormSchema = zod.object({
  nome: zod.string(),
  sobrenome: zod.string(),
  rg: zod.string() || zod.array(zod.string()) || zod.null(),
  cep: zod.string(),
  logradouro: zod.string(),
  numero: zod.string(),
  bairro: zod.string(),
  localidade: zod.string(),
  uf: zod.string(),
})


type NewPacienteFormInputs = zod.infer<typeof newPacienteFormSchema>

interface PacienteFormProps {
  data?: Paciente
}

export default function PacienteForm({ data }: PacienteFormProps) {
  const router = useRouter()
  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<NewPacienteFormInputs>({
    resolver: zodResolver(newPacienteFormSchema)
  })

  const { createPaciente, updatePaciente } = useContextSelector(PacienteContext, (context) => {
    return context
  })
  async function handleCreateNewDentista(data: NewPacienteFormInputs) {
    const paciente = {
      nome: data.nome,
      sobrenome: data.sobrenome,
      rg: data.rg,
      endereco: {
        logradouro: data.logradouro,
        cep: data.cep,
        numero: data.numero,
        localidade: data.localidade,
        bairro: data.bairro,
        uf: data.uf
      }
    }
    if (router.query.rg === data.rg) {

      updatePaciente(paciente)
    }
    createPaciente(paciente)

    reset()
  }
  return (
    <form onSubmit={handleSubmit(handleCreateNewDentista)}>
      <VStack>
        <HStack>
          <input
            type="text"
            placeholder='Nome'
            {...register('nome')}
            defaultValue={data?.nome}
            required />
          <input
            type="text"
            placeholder='Sobrenome'
            {...register('sobrenome')}
            defaultValue={data?.sobrenome}
            required />
        </HStack>
        <input
          type="text"
          placeholder='rg'
          {...register('rg')}
          readOnly={!!router.query.rg}
          defaultValue={data?.rg}
          required />

        <HStack>
          <input
            type="text"
            placeholder='logradouro'
            {...register('logradouro')}
            defaultValue={data?.endereco?.logradouro}
            required />
          <input
            type="text"
            placeholder='numero'
            {...register('numero')}
            defaultValue={data?.endereco?.numero}
            required />
        </HStack>
        <HStack>
          <input
            type="text"
            placeholder='bairro'
            {...register('bairro')}
            defaultValue={data?.endereco?.bairro}
            required />
          <input
            type="text"
            placeholder='cep'
            {...register('cep')}
            defaultValue={data?.endereco?.cep}
            required />
        </HStack>
        <HStack>
          <input
            type="text"
            placeholder='localidade'
            {...register('localidade')}
            defaultValue={data?.endereco?.localidade}
            required />
          <input
            type="text"
            placeholder='UF'
            {...register('uf')}
            defaultValue={data?.endereco?.uf}
            required />
        </HStack>
        <button type='submit' >
          {router.query.rg ? "Editar" : "Salvar"}
        </button>
      </VStack>
    </form>
  )
}