import * as zod from 'zod'
import {  useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateUserContainer } from './styles'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateUserFormSchema = zod.object({
  username: zod.string(  ),
  password: zod.string(),
  repeatPassword: zod.string(),
}).refine((data) => data.password === data.repeatPassword ,{
  message: "Senhas não sâo iguais",
  path:["repeatSenha"]
})


type CreateUserFormInputs = zod.infer<typeof CreateUserFormSchema>

export default function CreateUser() {
  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: {isSubmitting, errors}
  } = useForm<CreateUserFormInputs>({
    resolver: zodResolver(CreateUserFormSchema)
  })

  
  async function handleCreateUser() {
    if(errors) {}
    console.log("123")
  }
  
  
  return(
    <>
    <CreateUserContainer>
      <form onSubmit={handleSubmit(handleCreateUser)}>
        <label>Usuário</label>
        <input type="text"  {...register('username')} required />

        <label>Senha</label> 
        <input type="password" {...register('password')} required />
        <label>Repetir Senha</label>
        <input type="password" {...register('repeatPassword')} required />
        
        <button 
        type='submit' 
        disabled={!!errors.repeatPassword}
        >
          {errors.repeatPassword ? errors.repeatPassword?.message : "Criar"}
          
        </button>
      </form>
    </CreateUserContainer>
     <ToastContainer pauseOnHover={false} autoClose={800} position="bottom-right" />
     </>
  )
}