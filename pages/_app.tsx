import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { RecoilRoot } from 'recoil';
import '@fontsource/nunito';
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<RecoilRoot>
			<ChakraProvider>
				<Component {...pageProps} />
			</ChakraProvider>
		</RecoilRoot>
	);
}

export default MyApp;
