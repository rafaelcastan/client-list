import { VStack, Flex, Input, Icon, Checkbox, CheckboxGroup, Text, HStack, Grid } from '@chakra-ui/react';
import { memo } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import { UseSearchContext } from '../../contexts/SearchContext';

interface FilterOptionsProps {
    categories:string[];
  }

function FiltersComponent({categories}:FilterOptionsProps){

    const verifyInput = new RegExp(/^[a-zA-Z]+$/);
    const {firstLetter, lastLetter, searchValue, selectedCategories, 
            setFirstLetter,setLastLetter,setSearchValue,
            setSelectedCategories
          } = UseSearchContext();


    return(
        <VStack spacing = {4} minW = {['240px','280px', '320px']}>
            <Flex
                as = "label"
                py = "4"
                px = "8"
                maxWidth = {400}
                alignItems = 'center'
                color = "white"
                bg = "blue.500"
                borderRadius = "full"
            >
                <Input 
                    color = "gray.50"
                    variant = "unstyled"
                    px = "4"
                    mr = "4"
                    placeholder = "Buscar contatos"
                    _placeholder = {{color:'gray.400'}}
                    value = {searchValue}
                    onChange = {event=>{
                        setSearchValue(event.target.value);
                    }}
                />
                <Icon as = {RiSearchLine}  />
            </Flex>

            <VStack spacing = {2}>
            <Text>
                Exibir contatos entre:
            </Text>
            <HStack alignItems = 'center' spacing = {4}>
                <Input  
                    maxLength = {1} 
                    type = "text" 
                    value = {firstLetter} 
                    onChange = {event=> { 
                    if (verifyInput.test(event.target.value) || event.target.value==='')
                        setFirstLetter(event.target.value.toUpperCase())
                    }}
                    placeholder = 'A'
                    maxW = '50px'
                    paddingLeft = '19px'
                    borderColor = 'blue.500'
                    isInvalid = {firstLetter>lastLetter && lastLetter!==''}
                />
                <Text>
                -
                </Text>
                <Input  
                    maxLength = {1} 
                    type = "text" 
                    value = {lastLetter} 
                    onChange = {event=>{
                    if (verifyInput.test(event.target.value) || event.target.value==='')
                        setLastLetter(event.target.value.toUpperCase())
                    }}
                    placeholder = 'Z'
                    maxW = '50px'
                    paddingLeft = '19px'
                    borderColor = 'blue.500'
                    isInvalid = {firstLetter>lastLetter && lastLetter!==''}
                />                
            </HStack>
            </VStack>

            <CheckboxGroup onChange = {value => setSelectedCategories(value)}  value = {selectedCategories}>
                <Grid 
                    width = '100%'
                    templateColumns = 'repeat(2, 1fr)'
                    gap = {1}
                >
                    {categories.map(category=>{
                    return(
                        <Checkbox key = {category} 
                            marginTop = '5px' 
                            value = {category}
                        >
                            {category}
                        </Checkbox>
                    )
                    })}
                
                </Grid>
            </CheckboxGroup>
        </VStack>
    )
}

export const Filters = memo(FiltersComponent, (prevProps, nextProps)=>{
    return Object.is(prevProps.categories, nextProps.categories)
})