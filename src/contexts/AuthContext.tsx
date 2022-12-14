import { ReactNode, useCallback, useEffect, useState, createContext } from "react"

import {setCookie, parseCookies, destroyCookie} from 'nookies';

import {decode} from 'jsonwebtoken';

import Router from "next/router";
import { api } from "../lib/apiClient";


interface AuthProviderProps {
  children: ReactNode
}

interface SigInCredentials {
  username: string
  password: string
}

interface User {
  username?: string
}

interface AuthProviderContextData {
  signIn:(credentials:SigInCredentials)=> Promise<void>
  isAuthenticated: boolean
  user: User
}

export const AuthContext = createContext({} as AuthProviderContextData)


export function signOut() {
  destroyCookie(undefined, 'odonto.token' )
  Router.push('/')
}


export function AuthProvider({children}:AuthProviderProps) {
  const [user, setUser] =  useState<User>({username: ""});
  const isAuthenticated = !!user;
  let token = parseCookies()
  useEffect(()=> {
    if(token['odonto.token']) {
     const decodedToken =  decode(token['odonto.token'])
     api.get(`/usuario/perfil/${String(decodedToken?.sub)}`)
      .then(response => {
        setUser({username: response.data.username})
      }).catch(() => {
        signOut()
      })
    } 
  },[])


  const signIn = useCallback(async ({username, password}:SigInCredentials) => {
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

      Router.push('/')
      Router.reload()
    } catch(error) {
      const message = error
      throw ({'error':`${error}`})
    }
  },[])

  return (
    <AuthContext.Provider value={{signIn, isAuthenticated, user}}>
      {children}
    </AuthContext.Provider>
  )
}