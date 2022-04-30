import  { Flex, Grid, Modal, ModalBody, ModalCloseButton, 
         ModalContent, ModalHeader, ModalOverlay, Text, VStack 
        } from "@chakra-ui/react";
import { memo } from "react";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { UseModalDrawer } from "../../contexts/ModalDrawerContext";
import { contact } from "../../types/contact";

interface ContactDetailsComponentProps {
    contact:contact;
}

function ContactDetailsComponent({contact}:ContactDetailsComponentProps){

    const {ModalController} = UseModalDrawer();
      
    const center = {
        lat: Number(contact.address.geo.lat),
        lng: Number(contact.address.geo.lng)
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: (process.env.REACT_APP_GMAP_KEY!==undefined ? process.env.REACT_APP_GMAP_KEY : '')
    })
      

    return(
        <Modal 
            onClose = {ModalController.onClose} 
            isOpen = {ModalController.isOpen}
            size = '5xl'
        >
            <ModalOverlay />
            <ModalContent pb = {5}>
                <ModalCloseButton onClick = {ModalController.onClose}/>
                <ModalBody>
                    <Flex 
                        direction = {{base:'column',lg:'row'}} 
                        alignItems = 'flex-start'  
                        justifyContent = {{base:'flex-start',lg:'space-around' }}
                    >
                        <VStack 
                            alignItems = 'flex-start' 
                            justifyContent = 'space-around'
                        >
                            <VStack alignItems = 'flex-start'>
                                <ModalHeader 
                                    color = "blue.500" 
                                    pb = '0' 
                                    px = '0'
                                >
                                    Detalhes do Contato:
                                </ModalHeader>
                                <Text>
                                    <Text as = 'strong'>Nome:</Text> {contact.name}
                                </Text>
                                <Text>
                                    <Text as = 'strong'>Usuário:</Text> {contact.username}
                                </Text>
                                <Text>
                                    <Text as = 'strong'>Nome da Empresa:</Text> {contact.company.name}
                                </Text>
                            </VStack>

                            <VStack alignItems = 'flex-start'>
                                <ModalHeader 
                                    color = "blue.500" 
                                    pb = '0' 
                                    px = '0'
                                >
                                    Formas de Contato:
                                </ModalHeader>
                                <Text>
                                    <Text as = 'strong'>E-mail:</Text> {contact.email}
                                </Text>
                                <Text>
                                    <Text as = 'strong'>Telefone:</Text> {contact.phone}
                                </Text>
                                <Text>
                                    <Text as = 'strong'>Website: </Text> {contact.website}
                                </Text>
                            </VStack>
                        </VStack>

                        <VStack 
                            w = {{base:'100%',lg:'50%' }}
                            h = "100%" 
                            flexDir = 'column' 
                            alignSelf ='flex-end' 
                            alignItems = {{base:'center',lg:'flex-start' }}
                            spacing = {{base:'0',lg:'8'}}
                        >
                            <VStack 
                                alignItems = 'flex-start' 
                                alignSelf = 'flex-start' 
                                marginBottom= {{base:'40px', lg:'0px'}}
                                mt = {{base:'20px',lg:'0px'}}
                            >
                                <ModalHeader color = "blue.500" pb = '0' px = '0'>
                                    Endereço:
                                </ModalHeader>
                                <Grid templateColumns = 'repeat(2,1fr)' columnGap = '10' rowGap = '2'>
                                    <Text>
                                        <Text as = 'strong'>Rua: </Text> {contact.address.street}
                                    </Text>
                                    <Text>
                                        <Text as = 'strong'>Número: </Text> {contact.address.suite}
                                    </Text>
                                    <Text>
                                        <Text as = 'strong'>Cidade: </Text> {contact.address.city}
                                    </Text>
                                    <Text>
                                        <Text as = 'strong'>CEP: </Text> {contact.address.zipcode}
                                    </Text>
                                </Grid>
                            </VStack>
                            {isLoaded && (
                                <GoogleMap
                                    mapContainerStyle = {{width: '100%', height: '300px'}}
                                    center = {center}
                                    zoom = {13}
                                >
                                </GoogleMap>
                            )}
                        </VStack>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export const ContactDetails = memo(ContactDetailsComponent, (prevProps, nextProps)=>{
    return Object.is(prevProps.contact, nextProps.contact)
})