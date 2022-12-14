import Link from "next/link";
import {  useContext, useEffect, useState } from "react";
import { Container,  LinkNav, LoginButton } from "./style";
import * as Dialog from '@radix-ui/react-dialog'
import LoginForm from "../Forms/loginForm";
import Modal from "../modal";
import {  AuthContext, signOut } from "../../contexts/AuthContext";
import { parseCookies } from "nookies";
import { decode } from "jsonwebtoken";
import { Router, useRouter } from "next/router";
import { HStack, VStack } from "../../styles/globals";

export function Header() {
  const router =  useRouter()
  function handleSignout() {
    signOut()
    router.reload()
  }
  const {user} = useContext(AuthContext)
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
      
      { user?.username ? 
        (<HStack> 
            <span>{user?.username}</span>
            <LoginButton onClick={() => handleSignout()}>
              Logout
            </LoginButton>
        </HStack>)
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