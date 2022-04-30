import { AspectRatio, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, VStack } from "@chakra-ui/react";
import { memo } from "react";
import { UseModalDrawer } from "../../contexts/ModalDrawerContext";
import { contact } from "../../types/contact";

interface ContactDetailsComponentProps {
    contact:contact;
}

function ContactDetailsComponent({contact}:ContactDetailsComponentProps){

    const {ModalController} = UseModalDrawer();
    const GmapAPIKey = process.env.REACT_APP_GMAP_KEY;

    return(
        <Modal 
            onClose={ModalController.onClose} 
            isOpen={ModalController.isOpen}
            size='5xl'
        >
            <ModalOverlay />
            <ModalContent pb={5}>
                <ModalCloseButton onClick={ModalController.onClose}/>
                <ModalBody>

                    <VStack alignItems='flex-start'>
                        <ModalHeader color="blue.500" pb='0' px='0'>Detalhes do Contato:</ModalHeader>
                        <Text>
                            <Text as='strong'>Nome:</Text> {contact.name}
                        </Text>
                        <Text>
                            <Text as='strong'>Usuário:</Text> {contact.username}
                        </Text>
                        <Text>
                            <Text as='strong'>Nome da Empresa:</Text> {contact.company.name}
                        </Text>
                    </VStack>

                    <VStack alignItems='flex-start'>
                        <ModalHeader color="blue.500" pb='0' px='0'>Formas de Contato:</ModalHeader>
                        <Text>
                            <Text as='strong'>E-mail:</Text> {contact.email}
                        </Text>
                        <Text>
                            <Text as='strong'>Telefone:</Text> {contact.phone}
                        </Text>
                        <Text>
                            <Text as='strong'>Website: </Text> {contact.website}
                        </Text>
                    </VStack>

                    <VStack alignItems='flex-start' marginBottom={{base:'40px', lg:'0px'}}>
                        <ModalHeader color="blue.500" pb='0' px='0'>Endereço:</ModalHeader>
                        <Text>
                            <Text as='strong'>Rua: </Text> {contact.address.street}
                        </Text>
                        <Text>
                            <Text as='strong'>Número: </Text> {contact.address.suite}
                        </Text>
                        <Text>
                            <Text as='strong'>Cidade: </Text> {contact.address.city}
                        </Text>
                        <Text>
                            <Text as='strong'>CEP: </Text> {contact.address.zipcode}
                        </Text>
                    </VStack>
                    <AspectRatio ratio={16 / 9}>
                        <iframe
                            title="GoogleMaps"
                            width="600"
                            height="450"
                            style={{border:'px'}}
                            loading="lazy"
                            allowFullScreen
                            src={`https://www.google.com/maps/embed/v1/view
                                    ?key=${GmapAPIKey}&center=${contact.address.geo.lat},${contact.address.geo.lng}`
                                }
                        ></iframe>
                    </AspectRatio>
                   
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export const ContactDetails = memo(ContactDetailsComponent, (prevProps, nextProps)=>{
    return Object.is(prevProps.contact, nextProps.contact)
})