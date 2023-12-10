import { createContext } from 'react';

export const SearchContext = createContext<
    {
        search: string; setSearch: React.Dispatch<React.SetStateAction<string>>
    }>({
        search: '', // some default value
        setSearch: () => { }, // noop function
    });