import { StringOrNumber } from '@chakra-ui/utils';
import { createContext, ReactNode, useState } from "react";
import { useContext } from "react"

interface SearchProviderProps{
    children: ReactNode;
}

type SearchContextData = {
    firstLetter : string;
    lastLetter: string; 
    searchValue: string; 
    selectedCategories: StringOrNumber[];
    setFirstLetter: React.Dispatch<React.SetStateAction<string>>
    setLastLetter: React.Dispatch<React.SetStateAction<string>>
    setSearchValue: React.Dispatch<React.SetStateAction<string>>
    setSelectedCategories: React.Dispatch<React.SetStateAction<StringOrNumber[]>>
}

const SearchContext = createContext({} as SearchContextData);

export function SearchProvider ({children}: SearchProviderProps){
    const [firstLetter, setFirstLetter] = useState('');
    const [lastLetter, setLastLetter] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<StringOrNumber[]>([])

    return(
        <SearchContext.Provider 
            value={{    
                firstLetter, lastLetter, searchValue, selectedCategories,
                setFirstLetter, setLastLetter, setSearchValue, setSelectedCategories
            }}
        >
            {children}
        </SearchContext.Provider>
    )
}

export const UseSearchContext = () => useContext(SearchContext)