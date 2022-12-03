import * as zod from 'zod'
import {  useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateUserContainer } from './styles'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateUserFormSchema = zod.object({
  usuario: zod.string(  ),
  senha: zod.string(),
  repeatSenha: zod.string(),
}).refine((data) => data.senha === data.repeatSenha ,{
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
        <input type="text"  {...register('usuario')} required />

        <label>Senha</label> 
        <input type="password" {...register('senha')} required />
        <label>Repetir Senha</label>
        <input type="password" {...register('repeatSenha')} required />
        
        <button 
        type='submit' 
        disabled={!!errors.repeatSenha}
        >
          {errors.repeatSenha ? errors.repeatSenha.message : "Criar"}
          
        </button>
      </form>
    </CreateUserContainer>
     <ToastContainer pauseOnHover={false} autoClose={800} position="bottom-right" />
     </>
  )
}