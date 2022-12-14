import * as zod from 'zod'
import {  useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useContextSelector } from 'use-context-selector'
import { AuthContext } from '../../contexts/AuthContext'
import { api } from '../../lib/apiClient'
import {setCookie, parseCookies, destroyCookie} from 'nookies';
import { Router, useRouter } from 'next/router'

const loginFormSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
})

type LoginFormInputs = zod.infer<typeof loginFormSchema>

export default function LoginForm(){
  // const {signIn} = useContextSelector(AuthContext, (context) => {return context})
  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: {isSubmitting}
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema)
  })
  const router = useRouter()
  async function handleLogin(data: LoginFormInputs) {
    const {username, password} = data
    try {
      const response = await api.post('/auth', {
        username, password
      })

      const {token} = response.data

      setCookie(undefined, 'odonto.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
         path: '/'
      })

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      router.reload()
    } catch(error) {
      const message = error
      throw ({'error':`${error}`})
    }
    reset()
  }

  return(
    <form onSubmit={handleSubmit(handleLogin)}>
      <input type="text" placeholder='Usuario' {...register('username')} required />
      <input type="text" placeholder='Senha' {...register('password')} required />
      <button type='submit'>Login</button>
      <Link href={"/user/create"}>
        Criar novo usuário
      </Link>
    </form>
  )
}