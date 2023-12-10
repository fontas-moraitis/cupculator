import { createContext } from 'react';

export const ActiveIngredientContext = createContext<
    {
        activeIng: string; setActiveIng: React.Dispatch<React.SetStateAction<string>>
    }
    | null>(null);