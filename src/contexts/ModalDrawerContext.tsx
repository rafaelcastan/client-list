import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { createContext, ReactNode } from "react";
import { useContext } from "react"

interface ModalDrawerProviderProps{
    children: ReactNode;
}

type ModalDrawerContextData = {
    ModalController : UseDisclosureReturn
}

const ModalDrawerContext = createContext({} as ModalDrawerContextData);

export function ModalDrawerProvider ({children}: ModalDrawerProviderProps){
    const ModalController = useDisclosure();

    return(
        <ModalDrawerContext.Provider value={{ModalController}}>
            {children}
        </ModalDrawerContext.Provider>
    )
}

export const UseModalDrawer = () => useContext(ModalDrawerContext)