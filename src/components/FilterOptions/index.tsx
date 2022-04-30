import { useBreakpointValue, Drawer, DrawerOverlay, DrawerContent, 
  DrawerCloseButton, DrawerHeader, DrawerBody } from '@chakra-ui/react';
import { memo } from 'react';
import { UseSidebarDrawer } from "../../contexts/SidebarDrawerContext"
import {Filters} from './Filters';

interface FilterOptionsProps {
  categories:string[];
}

function FilterOptionsComponent({categories}:FilterOptionsProps){

  const {Sidebar} = UseSidebarDrawer();

  const isDrawerSidebar = useBreakpointValue({
      base: true,
      xl: false,
  });

    if (isDrawerSidebar) {
        return(
            <Drawer 
              isOpen={Sidebar.isOpen} 
              placement="left" 
              onClose={Sidebar.onClose} 
              size='sm'
            >
              <DrawerOverlay>
                  <DrawerContent bg='white' p='4'>
                      <DrawerCloseButton mt='6' _focus={{border:'none'}}/>
                      <DrawerHeader py={4} px={0}>
                        Filtros
                      </DrawerHeader>
                      <DrawerBody p='0'>
                          <Filters 
                            categories={categories} 
                          />
                      </DrawerBody>
                  </DrawerContent>
              </DrawerOverlay>
            </Drawer>
        )
    }

    return(
      <Filters 
        categories={categories}
      />
    )
}

export const FilterOptions = memo(FilterOptionsComponent, (prevProps, nextProps)=>{
  return Object.is(prevProps.categories, nextProps.categories)
})