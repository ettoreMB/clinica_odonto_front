import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { HStack, VStack } from '../../styles/globals'
import { useRouter } from 'next/router'
import { useContextSelector } from 'use-context-selector'
import { Paciente, PacienteContext } from '../../contexts/PacientesContext'
import { toast } from 'react-toastify'
import { isAxiosError } from 'axios'

const newPacienteFormSchema = zod.object({
  nome: zod.string().min(2),
  sobrenome: zod.string(),
  rg: zod.string().min(9).max(10) || zod.array(zod.string().min(9).max(10)) ,
  password: zod.string(),
  cep: zod.string().min(9).max(9),
  logradouro: zod.string(),
  numero: zod.string(),
  bairro: zod.string(),
  localidade: zod.string(),
  uf: zod.string().min(2).max(2),
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
  async function handleCreateNewPaciente(data: NewPacienteFormInputs) {
    const paciente = {
      nome: data.nome,
      sobrenome: data.sobrenome,
      rg: data.rg,
      endereco: {
        cep: data.cep,
        logradouro: data.logradouro,
        numero: data.numero,
        bairro: data.bairro,
        localidade: data.localidade,
        uf: data.uf,
      },
      usuario: {
        password: data.password
      }
    }
    try {
      if (router.query.rg === data.rg) {
        await updatePaciente(paciente)
        toast.success("Paciente editado com sucesso")
        reset()
      }
      await createPaciente(paciente)
      toast.success("Paciente criado com sucesso")
    } catch (err) {
      isAxiosError(err) ? toast.error(err?.response?.data) : toast.error("Erro ao editar o dentista")
    }
  }
  return (
    <form onSubmit={handleSubmit(handleCreateNewPaciente)}>
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
        <input
          type="password"
          placeholder='senha'
          {...register('password')}
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