import Link from "next/link";
import { useState } from "react";
import { Container,  LinkNav, LoginButton } from "./style";
import UserInfo from "./usersInfo";
import * as Dialog from '@radix-ui/react-dialog'
import LoginForm from "../Forms/loginForm";
import Modal from "../modal";
export function Header() {

  const [isLogin, setIsLogin] = useState(false)
  return(
    <Container>
      <LinkNav>
      <Link href={"/dentistas"}>
          Dentistas
      </Link>
      <Link href={"/pacientes"}>
          Pacientes
      </Link>
      </LinkNav>
      
      { isLogin ? 
        (<>
            <UserInfo />
            <LoginButton onClick={() => setIsLogin(false)}>
              Logout
            </LoginButton>
        </>)
        : (<Login />) }
    </Container>
  )
}
const Login = () => {
  return(
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <LoginButton>
          Login
        </LoginButton>
      </Dialog.Trigger>
      <Modal title='Cadastrar Novo Paciente'>
        <LoginForm />
      </Modal>
    </Dialog.Root>
  )
}