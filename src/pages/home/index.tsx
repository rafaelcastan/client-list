import { Heading, VStack, Box, Progress, Text, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import ShowContactsList from "../../components/ShowContacts";
import { api } from "../../services/api";
import {contact} from "../../types/contact";


export default function Home() {

    const [contactsList, setContactsList] = useState<contact[]>([]);
    const [errMessage, setErrMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        
        api.get<contact[]>(`/users`).then(response=>{
            setContactsList(response.data);
            setIsLoading(false);
        }).catch((err:any)=>{
            setErrMessage(err.message);
        })

    },[])

    return (
        <VStack justifyContent = "space-between"
                marginTop = "33px"
                paddingLeft= {{base: "12px", md:"20px",lg:"40px", xl:"50px"}}
                paddingRight = {{base: "12px", md:"20px",lg:"40px", xl:"50px"}}
                flexDirection = "column"
                spacing={10}
        >

        <Heading color='blue.500'>
            Lista de Contatos
        </Heading>
        
        <Box w="100%">

            {errMessage!=='' ? 
                (
                    <Flex w="100%" alignItems='center' justifyContent='center'>
                        <Text fontSize='lg'
                              textAlign='center'
                        >
                            Não foi possível carregar os contatos
                        </Text>
                    </Flex>
                ) 
            : 
            (
            isLoading ? 
                (<Progress size='md' isIndeterminate />) 
                : 
                (
                    <ShowContactsList 
                        contactList={contactsList}
                    />
                )
            )}

        </Box>
            
        </VStack>
    );
}
