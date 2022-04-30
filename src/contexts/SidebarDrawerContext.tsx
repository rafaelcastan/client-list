import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { createContext, ReactNode } from "react";
import { useContext } from "react"

interface SidebarDrawerProviderProps{
    children: ReactNode;
}

type SidebarDrawerContextData = {
    Sidebar : UseDisclosureReturn
}

const SidebarDrawerContext = createContext({} as SidebarDrawerContextData);

export function SidebarDrawerProvider ({children}: SidebarDrawerProviderProps){
    const Sidebar= useDisclosure();

    return(
        <SidebarDrawerContext.Provider value={{Sidebar}}>
            {children}
        </SidebarDrawerContext.Provider>
    )
}

export const UseSidebarDrawer = () => useContext(SidebarDrawerContext)