import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';

import App from './App';
import { theme } from './styles/theme';
import { SidebarDrawerProvider } from './contexts/SidebarDrawerContext';
import { SearchProvider } from "./contexts/SearchContext";
import { ModalDrawerProvider } from "./contexts/ModalDrawerContext";

ReactDOM.render(
  <React.StrictMode>
     <ChakraProvider theme={theme}>
      <CSSReset />
      <SidebarDrawerProvider>
        <SearchProvider>
          <ModalDrawerProvider>
            <App />
          </ModalDrawerProvider>
        </SearchProvider>
      </SidebarDrawerProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);