import { ChakraProvider, extendTheme, useColorMode } from '@chakra-ui/react';
import {
  darkTheme,
  lightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { theme } from '@vocdoni/react-components';
import { RouterProvider } from 'react-router-dom';
import { WagmiConfig } from 'wagmi';
import { chains, wagmiClient } from './lib/rainbow/rainbow';
import router from './router/Router';

export const App = () => {
  const { colorMode } = useColorMode();

  const rainbowStyles =
    colorMode === 'light'
      ? lightTheme({
          accentColor: '#78D8AA',
          accentColorForeground: 'white',
          borderRadius: 'medium',
        })
      : darkTheme({
          accentColor: '#78D8AA',
          accentColorForeground: 'white',
          borderRadius: 'medium',
        });

  return (
    <ChakraProvider theme={extendTheme(theme)}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} theme={rainbowStyles}>
          <RouterProvider router={router} />
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
};
