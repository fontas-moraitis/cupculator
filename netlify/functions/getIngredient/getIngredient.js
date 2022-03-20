const fs = require("fs").promises;
const path = require("path");

exports.handler = async (event, context, callback) => {
    const querystring = event.queryStringParameters;
    const content = await fs.readFile(path.join(__dirname, "data.json"), {encoding: "utf-8"});
    const parsed = JSON.parse(content);

    if (querystring.lang) {
      let listOfIngredients = parsed.map(ingredient => {
        return ({ id: ingredient.id, label: ingredient.name[querystring.lang] });
      })
      return {
        statusCode: 200,
        contentType: 'application/json',
        charset: 'utf-8',
        body: JSON.stringify(listOfIngredients)
      };
    }
  else {
    let activeIngredient = querystring.ingredient;
    try {
      const searchId = (x, id) => {
        for(var i = 0; i < x.length; i++) {
            if (x[i]['id']==id){
                return x[i];
            }
        }
        return -1;
    }
    
    const myIngredient = searchId(parsed, activeIngredient);

        return {
          statusCode: 200,
          body: JSON.stringify(myIngredient)
        };
      } catch (e) {
        return {
          statusCode: 500,
          body: e
        };
      }
    }
  };