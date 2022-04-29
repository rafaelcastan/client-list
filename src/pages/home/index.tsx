import { Heading, HStack, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { api } from "../../services/api";

interface contacts {
  id: number,
    name: string,
    username: string,
    email: string,
    address: {
      street: string,
      suite: string,
      city: string,
      zipcode: string,
      geo: {
        lat: string,
        lng: string
      }
    },
    phone: string,
    website: string,
    company: {
      name: string,
      catchPhrase: string,
      bs: string
    },
}

export default function Home() {

  const [contactsList, setContactsList] = useState<contacts[]>([]);
  const [errMessage, setErrMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    
    async function getContactsList(){

      api.get<contacts[]>(`/users`).then(response=>{
        setContactsList(response.data)
        setIsLoading(false)
      }).catch((err)=>{
        setErrMessage(err.message);
      })

    }

    getContactsList();
    
  },[])

  return (
    <VStack   spacing='80px' //Adds vertical space between childrens
              justifyContent = "space-between"
              marginTop = "33px"
              paddingBottom="55px"
              paddingLeft= {{base: "12px", md:"20px",lg:"65px", xl:"65px"}}
              paddingRight = {{base: "12px", md:"20px",lg:"65px", xl:"0px"}}
              flexDirection = "column"
    >
    <Heading>Lista de Contatos</Heading>
    
        {errMessage!=='' ? (<span>{errMessage}</span>) : (
          isLoading ? (<span>Loading...</span>) : (<span>Contacts</span>)
        )}
        
    </VStack>
  );
}
