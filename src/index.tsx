import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, CSSReset } from '@chakra-ui/react';

import App from './App';
import { theme } from './styles/theme';
import { SidebarDrawerProvider } from './contexts/SidebarDrawerContext';
import { SearchProvider } from "./contexts/SearchContext";
import { ModalDrawerProvider } from "./contexts/ModalDrawerContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
  <StrictMode>
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
  </StrictMode>
);