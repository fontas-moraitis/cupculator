import { createContext } from 'react';

export type Ingredient = {
    id: string;
    name: {
        en: string;
        el: string;
    };
    unit: string;
    metrics: {
        cup: { us: number, uk?: number };
        '1/2': { us: number, uk?: number };
        '1/3': { us: number, uk?: number };
        '1/4': { us: number, uk?: number };
        tbsp: { us: number, uk?: number };
        tsp: { us: number, uk?: number };
    };
};

export const ActiveIngredientContext = createContext<{
    activeIng: Ingredient | null;
    setActiveIng: React.Dispatch<React.SetStateAction<Ingredient | null>>
}>({
    activeIng: null,
    setActiveIng: () => { },
})