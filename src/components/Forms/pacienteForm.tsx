import * as zod from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '../../lib/axios'

const newPacienteFormSchema = zod.object({
  nome: zod.string(),
  sobrenome: zod.string(),
  rg: zod.string(),
  cep: zod.string(),
  logradouro: zod.string(),
  numero: zod.string(),
  bairro: zod.string(),
  localidade: zod.string(),
  uf: zod.string(),

  
})


type NewPacienteFormInputs = zod.infer<typeof newPacienteFormSchema>


export default function PacienteForm() {

  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: {isSubmitting}
  } = useForm<NewPacienteFormInputs>({
    resolver: zodResolver(newPacienteFormSchema)
  })


  async function handleCreateNewDentista(data: NewPacienteFormInputs) {
    const {nome,sobrenome, rg,logradouro,cep,bairro,numero,localidade,uf} = data
    await api.post("pacientes", {
      nome,
      sobrenome,
      rg,
      dataCadastro: new Date(),
      endereco :{
        cep,
        logradouro,
        numero,
        bairro,
        localidade,
        uf
      }
      
    })
    reset()
}
  return (
    <form onSubmit={handleSubmit(handleCreateNewDentista)}>
      <input type="text" placeholder='Nome' {...register('nome')} required />
      <input type="text" placeholder='Sobrenome' {...register('sobrenome')} required />
      <input type="text" placeholder='rg' {...register('rg')} required />
      <input type="text" placeholder='logradouro' {...register('logradouro')} required />
      <input type="text" placeholder='numero' {...register('numero')} required />
      <input type="text" placeholder='bairro' {...register('bairro')} required />
      <input type="text" placeholder='localidade' {...register('localidade')} required />
      <input type="text" placeholder='UF' {...register('uf')} required />
      <input type="text" placeholder='cep' {...register('cep')} required />

      <button type='submit' disabled={isSubmitting}>Salvar</button>
    </form>
  )
}