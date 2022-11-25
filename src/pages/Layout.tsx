import { ReactNode } from "react"
import { Header } from "../components/Header"
import { Container, Wrapper } from "../styles/globals"


type RootLayoutProps ={
  children: any
}

export default function RootLayout({children}:RootLayoutProps) {
  return(
    <>
      <Header />
      <Container>
        <Wrapper>
          {children}
        </Wrapper>
      </Container>
    </>
  )
}