import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import React, {useState, useEffect} from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()
function MyApp({ Component, pageProps }) {

  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);  

  if (isSSR) return null;


  return ( 


    <>
      <QueryClientProvider client={queryClient}>
      <ChakraProvider>
   <Component {...pageProps} />

      </ChakraProvider>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
