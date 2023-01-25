import '../globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Snackbar from '../components/core/snack'
import { useAtom } from 'jotai'
import { snackAtom } from '../stores/atoms'
import { QueryClient, QueryClientProvider } from 'react-query'
import AuthProvider from '../components/core/auth-provider'
import { NextPageWithLayout } from '../types/types'

const queryClient = new QueryClient()

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	const [snack, setSnack] = useAtom(snackAtom)

	const getLayout = Component.getLayout ?? ((page) => page)

	return (
		<QueryClientProvider client={queryClient}>
			<div className=''>
				<Head>
					<title>LBS Admin</title>
					<meta name='viewport' content='initial-scale=1.0, width=device-width' />
					<link rel='shortcut icon' href='/favicon.ico' />
				</Head>

				<AuthProvider>
					<Snackbar snack={snack} setIsOpen={(open) => setSnack({ ...snack, isOpen: open })} timeoutMS={5000} />

					{getLayout(<Component {...pageProps} />)}
				</AuthProvider>
			</div>
		</QueryClientProvider>
	)
}

export default MyApp
