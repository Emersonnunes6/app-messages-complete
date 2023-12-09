"use client";

import { ColorModeScript } from '@chakra-ui/color-mode'
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import App from './app';
import { ToastContainer } from 'react-toastify';
import UserContext, { AccountContext } from './login/AccountContext';

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <>
      <UserContext>
        <ChakraProvider theme={theme}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
          {children}
        </ChakraProvider>
      </UserContext>
    </>
  )
}
