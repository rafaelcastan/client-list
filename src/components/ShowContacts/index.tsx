import { Table, Thead, Tr, Th, Tbody, Td, Text, Box, HStack, 
         useBreakpointValue, Icon, IconButton  } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useTable, useSortBy, Column } from 'react-table';
import { useMemo } from "react";
import { RiMenuLine } from "react-icons/ri";
import { useState } from "react";
import { useEffect } from "react";

import {contact} from "../../types/contact";
import { FilterOptions } from "../FilterOptions";
import { UseSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import { UseSearchContext } from "../../contexts/SearchContext";
import { ContactDetails } from "../ContactDetails";
import { UseModalDrawer } from "../../contexts/ModalDrawerContext";


interface ShowContactsListProps {
    contactList : contact[]
}

interface TableContent{
    companyName: string;
    name: string;
    phone: string;
    email: string;
}
interface ColumnType{
    companyName:string;
    name:string;
    phone:string;
    email:string;
}

export default function ShowContactsList({contactList}:ShowContactsListProps) {

    const [data, setData] = useState<TableContent[]>([]);
    const [companyCategories, setCompanyCategories] = useState<string[]>([]);
    const [filteredContacts, setFilteredContacts] = useState<contact[]>([]);
    const [selectedContact, setSelectedContact] = useState<contact>();

    const {Sidebar} = UseSidebarDrawer();
    const {ModalController} = UseModalDrawer();
    const {firstLetter, lastLetter, searchValue, selectedCategories} = UseSearchContext();

    const showSidebarButton = useBreakpointValue({
        base: true,
        xl: false,
    });

    useEffect(()=>{

        setFilteredContacts([...contactList]);
       
        const allCompanyCategories = contactList.map(contact=>{
            return(
                contact.company.bs.split(' ')
            )
        });
        let noRepeatedCategories:string[] = [];

        allCompanyCategories.forEach(categories=>{
            categories.forEach(category=>{
                if(!noRepeatedCategories.includes(category))
                {
                    noRepeatedCategories.push(category)
                }
            })
        });

        setCompanyCategories(noRepeatedCategories);

    },[contactList]);

    useEffect(()=>{
    
        const filteredData = filteredContacts.map(contact=>{
            return({
                companyName: contact.company.name,
                name: contact.name,
                phone: contact.phone,
                email: contact.email,
            })
        });

        setData(filteredData);
        
    },[filteredContacts]);

    const columns:Array<Column<ColumnType>> = useMemo(
        () => [
            {
            Header: 'Nome',
            accessor: 'name',
            },
            {
                Header: 'Empresa',
                accessor: 'companyName',
            },
            
            {
                Header: 'Telefone',
                accessor: 'phone',
                disableSortBy: true
            },
            {
                Header: 'E-mail',
                accessor: 'email',
                disableSortBy: true
            },
            ],
            [],
      );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = 
            useTable({ columns, data }, useSortBy);

    function showContactDetails(contact:contact){
        setSelectedContact(contact)
        ModalController.onOpen();
    }
    

    useEffect(()=>{ //apply all filters
            
            const noSpaceSearchValue = searchValue.replaceAll(' ','')

            let results = contactList.filter(contact=>{
                return  (
                    contact.name.replaceAll(' ','').includes(noSpaceSearchValue) 
                    || 
                    contact.company.name.replaceAll(' ','').includes(noSpaceSearchValue)
                )
            });

            let initial = firstLetter;
            let final = lastLetter;

            if(initial==='')
                initial='a'

            if(final==='')
                final='z'

            if(initial===final){
                results = results.filter(contact=>{
                    return contact.name.startsWith(initial)
                });
            }else if(initial<final){
                const regex = `^[${initial.toLowerCase()}-${final.toLowerCase()}]`;
                const letterRange = new RegExp(regex);

                results = results.filter(contact=>{
                    return letterRange.test(contact.name.toLowerCase());
                }).sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
            }

            let categoriesFilter = selectedCategories;

            if(categoriesFilter.length>0)
            results = results.filter((contact)=>{
                return contact.company.bs.split(' ').some(type=>{
                    return categoriesFilter.includes(type)
                })
            })

            setFilteredContacts(results)
            
    },[contactList, firstLetter, lastLetter, searchValue, selectedCategories]);

    return(
        <HStack spacing = {{base:'0', xl:'10'}} alignItems = 'flex-start'>
            <FilterOptions 
                categories = {companyCategories}
            />

            {selectedContact!==undefined &&
                <ContactDetails 
                    contact = {selectedContact}
                />
            }            

            {showSidebarButton && (
                <IconButton 
                    aria-label = "Open Filters"
                    onClick = {Sidebar.onOpen} 
                    position = 'absolute' 
                    right = {{base:'20px', lg:'40px' }}
                    top = '33px'
                    icon = {<Icon as = {RiMenuLine} />}
                    bg = 'blue.300'
                    color = 'white'
                    borderRadius = 'full'
                    _focus = {{border:'none'}}
                >
                </IconButton>
            )}
        
            <Box overflowX = 'auto' w = "100%">
                <Table {...getTableProps()} 
                       bg = "blue.300" 
                       color = 'white'
                       borderRadius = 'xl'
                       overflow = 'hidden'
                >
                    <Thead>
                        {headerGroups.map((headerGroup) => (
                        <Tr {...headerGroup.getHeaderGroupProps()} 
                            bg = "blue.500"
                            padding = '5px'
                        >
                            {headerGroup.headers.map((column) => (
                            <Th
                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                color = 'white'
                                fontSize = 'md'
                                minH = '41px'
                                minW = '174px'
                            >
                                {column.render('Header')}
                                <Text as = 'span' pl = '4'>
                                    {column.isSorted ? (
                                        column.isSortedDesc ? (
                                        <TriangleDownIcon aria-label = 'sorted descending' />
                                        ) : (
                                        <TriangleUpIcon aria-label = 'sorted ascending' />
                                        )
                                    ) : null}
                                </Text>
                            </Th>
                            ))}
                        </Tr>
                        ))}
                    </Thead>
                    <Tbody {...getTableBodyProps()}>
                        {rows.map((row, index) => {
                            prepareRow(row)
                            return (
                                <Tr {...row.getRowProps()} 
                                    onClick = {()=>{showContactDetails(contactList[index])}}
                                    cursor = 'pointer'
                                >
                                    {row.cells.map((cell) => (
                                        <Td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </Td>
                                    ))}
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </Box>
        </HStack>
    )
}