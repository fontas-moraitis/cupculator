import { createContext } from 'react';

export type CardIngredient = {
    id: string;
    label: string;
}

export const ActiveIngredientContext = createContext<{
    activeIng: CardIngredient | null;
    setActiveIng: React.Dispatch<React.SetStateAction<CardIngredient>>
}>({
    activeIng: null,
    setActiveIng: () => { },
})