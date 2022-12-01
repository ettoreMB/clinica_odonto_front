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
      <Link href={"/dentistas"} replace >
          Dentistas
      </Link>
      <Link href={"/pacientes"}>
          Pacientes
      </Link>
      <Link href={"/consultas"}>
          Consultas
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
      <Modal title='Login'>
       <LoginForm />
      </Modal>
    </Dialog.Root>
  )
}