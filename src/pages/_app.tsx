import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/globals'
import RootLayout from './Layout'
globalStyles()
export default function App({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>

  )
}
