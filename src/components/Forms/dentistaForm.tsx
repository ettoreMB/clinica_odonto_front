import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContextSelector } from 'use-context-selector'
import { Dentista, DentistaContext } from '../../contexts/DentistaContextx'
import { useRouter } from 'next/router'

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAxiosError } from "axios"
import { VStack } from '../../styles/globals'

const newDentistaFormSchema = zod.object({
  nome: zod.string(),
  sobrenome: zod.string(),
  matricula: zod.string() || zod.array(zod.string()) || zod.null(),
  password: zod.string(),
})

type NewDentistaFormInputs = zod.infer<typeof newDentistaFormSchema>

interface DentistaFormProps {
  data?: Dentista
}

export default function DentistaForm({ data }: DentistaFormProps) {
  const router = useRouter()
  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<NewDentistaFormInputs>({
    resolver: zodResolver(newDentistaFormSchema)
  })

  const { createDentista, updateDentista } = useContextSelector(DentistaContext, (context) => {
    return context
  })

  async function handleCreateDentista(data: NewDentistaFormInputs) {
    const { nome, sobrenome, matricula, password } = data
    try {
      if (router.query.matricula === matricula) {
        const { matricula } = router.query
        await updateDentista({ nome, sobrenome, matricula, password })
        toast.success("Dentista editado com sucesso")
        reset()
      } else {
        await createDentista({ nome, sobrenome, matricula, password })
        toast.success("Dentista criado com sucesso")
        reset()
      }
    } catch (err) {
      isAxiosError(err) ? toast.error(err?.response?.data) : toast.error("Erro ao editar o dentista")
    }

  }

  return (
    <>
      <form onSubmit={handleSubmit(handleCreateDentista)}>
        <VStack>
          <input
            type="text"
            placeholder='Nome'
            {...register('nome')}
            required
            defaultValue={data?.nome}
          />
          <input
            type="text"
            placeholder='Sobrenome'
            {...register('sobrenome')}
            required
            defaultValue={data?.sobrenome}
          />
          <input
            type="text"
            placeholder='matricula'
            {...register('matricula')}
            readOnly={!!router.query.matricula}
            required
            defaultValue={data?.matricula}
          />
          <input
            type="password"
            placeholder='Senha'
            {...register('password')}
            required
            defaultValue={data?.password}
          />

          <button type='submit' >
            {router.query.matricula === data?.matricula ? "Salvar" : "Editar"}
          </button>
        </VStack>

      </form>
    </>
  )
}