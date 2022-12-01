import type { AppProps } from 'next/app'
import { ConsultaContext, ConsultaProvider } from '../contexts/ConsultaContextx'
import { DentistaProvider } from '../contexts/DentistaContextx'
import { PacienteProvider } from '../contexts/PacientesContext'
import { ToastContextProvider } from '../contexts/ToastContext'
import { globalStyles } from '../styles/globals'
import RootLayout from './Layout'
globalStyles()
export default function App({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <ToastContextProvider>
      <DentistaProvider>
      <PacienteProvider>
        <ConsultaProvider>
        
        <Component {...pageProps} />
        </ConsultaProvider>
      </PacienteProvider>
      </DentistaProvider>
      </ToastContextProvider>
    </RootLayout>

  )
}
