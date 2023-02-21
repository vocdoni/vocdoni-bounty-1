import { ChakraProvider, theme } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import router from './router/Router';

export const App = () => (
  <ChakraProvider theme={theme}>
    {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
    <RouterProvider router={router} />
  </ChakraProvider>
);
