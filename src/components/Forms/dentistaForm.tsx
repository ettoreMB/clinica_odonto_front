import * as zod from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '../../lib/axios'

const newDentistaFormSchema = zod.object({
  nome: zod.string(),
  sobrenome: zod.string(),
  matricula: zod.string(),
})


type NewDentistaFormInputs = zod.infer<typeof newDentistaFormSchema>


export default function DentistaForm() {

  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: {isSubmitting}
  } = useForm<NewDentistaFormInputs>({
    resolver: zodResolver(newDentistaFormSchema)
  })


  async function handleCreateNewDentista(data: NewDentistaFormInputs) {
    const {nome, sobrenome, matricula} = data
    await api.post("dentistas",  {
      nome,
      sobrenome,
      matricula
    })
    reset()
  }
  return (
    <form onSubmit={handleSubmit(handleCreateNewDentista)}>
      <input type="text" placeholder='Nome' {...register('nome')} required />
      <input type="text" placeholder='Sobrenome' {...register('sobrenome')} required />
      <input type="text" placeholder='matricula' {...register('matricula')} required />
      <button type='submit' disabled={isSubmitting}>Salvar</button>
    </form>
  )
}