import * as zod from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Button } from '../../styles/globals'


const loginFormSchema = zod.object({
  usuario: zod.string(),
  senha: zod.string(),
})

type LoginFormInputs = zod.infer<typeof loginFormSchema>

export default function LoginForm(){

 

  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: {isSubmitting}
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema)
  })

  async function handleLogin(data: LoginFormInputs) {
    const {usuario, senha} = data
    console.log(usuario, senha)
    reset()
  }

  return(
    <form onSubmit={handleSubmit(handleLogin)}>
      <input type="text" placeholder='Usuario' {...register('usuario')} required />
      <input type="text" placeholder='Senha' {...register('senha')} required />
      <Button type='submit'>Login</Button>
    </form>
  )
}