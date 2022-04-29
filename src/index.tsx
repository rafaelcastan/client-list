import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

import { ChakraProvider, CSSReset } from '@chakra-ui/react';

import App from './App';
import { theme } from './styles/theme';


const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

root.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <CSSReset />
      <App />
    </ChakraProvider>
  </StrictMode>
);