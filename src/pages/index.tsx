import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Home() {

  const {user} = useContext(AuthContext)
    return (
      <h1>Bem vindo ao Odonto DH , {user?.username ?  user?.username : "Faça Login para acessar o sistema" }</h1>
    )
    
   
}