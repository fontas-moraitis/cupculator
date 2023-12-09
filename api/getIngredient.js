// /api/ingredients.js
import fs from 'fs/promises';
import path from 'path';

const readDataFile = async () => {
    const filePath = path.join(process.cwd(), 'api/data.json');
    const content = await fs.readFile(filePath, { encoding: 'utf-8' });
    return JSON.parse(content);
};

const findIngredientById = (ingredients, id) => {
    return ingredients.find(ingredient => ingredient.id === id) || null;
};

export default async function handler(req, res) {
    const { lang, ingredient } = req.query;
    const data = await readDataFile();

    try {
        if (lang) {
            const listOfIngredients = data.map(ingredient => ({
                id: ingredient.id,
                label: ingredient.name[lang] || 'Unknown'
            }));
            return res.status(200).json(listOfIngredients);
        } else if (ingredient) {
            const myIngredient = findIngredientById(data, ingredient);
            return myIngredient 
                ? res.status(200).json(myIngredient)
                : res.status(404).json({ error: 'Ingredient not found' });
        } else {
            return res.status(400).json({ error: 'No query parameters provided' });
        }
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}


// const fs = require("fs").promises;
// const path = require("path");

// exports.handler = async (event, context, callback) => {
//     const querystring = event.queryStringParameters;
//     const content = await fs.readFile(path.join(__dirname, "data.json"), {encoding: "utf-8"});
//     const parsed = JSON.parse(content);

//     if (querystring.lang) {
//       let listOfIngredients = parsed.map(ingredient => {
//         return ({ id: ingredient.id, label: ingredient.name[querystring.lang] });
//       })
//       return {
//         statusCode: 200,
//         contentType: 'application/json',
//         charset: 'utf-8',
//         body: JSON.stringify(listOfIngredients)
//       };
//     }
//   else {
//     let activeIngredient = querystring.ingredient;
//     try {
//       const searchId = (x, id) => {
//         for(var i = 0; i < x.length; i++) {
//             if (x[i]['id']==id){
//                 return x[i];
//             }
//         }
//         return -1;
//     }
    
//     const myIngredient = searchId(parsed, activeIngredient);

//         return {
//           statusCode: 200,
//           body: JSON.stringify(myIngredient)
//         };
//       } catch (e) {
//         return {
//           statusCode: 500,
//           body: e
//         };
//       }
//     }
//   };