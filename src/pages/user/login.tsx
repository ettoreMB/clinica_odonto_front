import { Container, LoginBox } from "./styles";

export default function LoginPage() {
  return(
    <Container>
      <LoginBox>
        <form action="">
          <input type="text" />
          <label htmlFor="">Usuario</label>

          <input type="text" />
          <label>Senha</label>
        </form>

        <button></button>
      </LoginBox>
    </Container>
  )
}