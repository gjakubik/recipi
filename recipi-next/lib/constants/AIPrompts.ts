export const INGREDIENT_PROMPT = `I have a source ingredient from a recipe that fits the data type "SourceIngredient" and a list of database ingredient names that potentially match the source ingredient, these database ingredient names are separated by a semicolon.
Using the sourceIngredient's name and dbSearchName, infer which ingredient from the database ingredients is semantically the closest to the source ingredient.
Please be as precise as possible when matching the ingredients. It's very important that the best match is the closest possible food to the source ingredient as you can get it. 

    interface SourceIngredient {
        name: string;
        dbSearchName: string;
    }

Refrain from leaving any comments at all, and output the database ingredient whose name best matches the source ingredient as a JSON object of the following format. .
     interface matchedIngredient {
        name: String
    }
  The matchedIngredient's name should be exactly the same as the database ingredient you flagged as the best match. This is extremely important. 

Refrain from leaving any comments at all, and output only JSON. 
Again, this response should start with \`\`\`json and end with \`\`\`, meaning that it is only the json block representing the recipe`

export const TEXT_PROMPT = `I have text of a recipe and the following data type. Parse what is in the text and then transfer the contents into the following data type. 
    Please be very careful to be specific about the measurements, as you often mistake 4 for 2s in denominators. There will be some fields such as prep time and cooking time that will need to be inferred by you. The amount of servings will also need to be inferred. Even if you are not sure the amount of servings, make a concrete estimate.
    If you are unable to make a concrete estimate, use the integer 0. Make sure that any amounts are json strings, and that any amounts use fractions instead of decimals. Fractions should be in the form of "1 1/2", with no other special characters used than /
    Be precise in naming ingredients, and put any extra information related to it in the note field. If there is no note, dont define the field. 
    
    After you have named the ingredient, infer the most identifiable part of each ingredient's name and save that in the dbSearchName field. This field is going to be used to search against a database of ingredients so it is very important for it to be as accurate as possible.
    The dbSearchName should be a simpler version of the ingredient name, that is specific enough to differentiate it from other foods, but general enough to be used as a search term.

    Generate a JSON object that fits this type
    Unit may be something different than these, but should be a full word, not an abbreviation
    type Unit = 'teaspoon' | 'tbs' | 'cup' | 'oz' | 'lb' | 'ml' | 'l' | 'g' | 'kg' | 'whole' | 'round' |'package' | 'clove';
    type Time = 'hhh:mm:ss'
    type Amount = 'number' | 'number number/number'

    interface RecipeForm {
      title: string;
      description: string;
      preparationTime: Time;
      cookingTime: Time;
      servings: string;
      difficultyLevel: string;
      instructions: string[];
      ingredients?: {
        amount: Amount;
        unit: Unit;
        name: string;
        dbSearchName?: string;
        note?: string;
      }[];
    }
    Refrain from leaving any comments at all, and output only JSON. Again, this response should start with \`\`\`json and end with \`\`\`, meaning that it is only the json block representing the recipe`

export const URL_PROMPT = `I have html of a website containing a recipe, and the following data type. Parse what is in the html and then transfer the contents into the following data type. 
    Please be very careful to be specific about the measurements, as you often mistake 4 for 2s in denominators. There will be some fields such as prep time and cooking time that will need to be inferred by you. The amount of servings will also need to be inferred. Even if you are not sure the amount of servings, make a concrete estimate.
    If you are unable to make a concrete estimate, use the integer 0. Make sure that any amounts are json strings, and that any amounts use fractions instead of decimals. Fractions should be in the form of "1 1/2", with no other special characters used than /
    Be precise in naming ingredients, and put any extra information related to it in the note field. If there is no note, dont define the field. 
    
    After you have named the ingredient, infer the most identifiable part of each ingredient's name and save that in the dbSearchName field. This field is going to be used to search against a database of ingredients so it is very important for it to be as accurate as possible.
    The dbSearchName should be a simpler version of the ingredient name, that is specific enough to differentiate it from other foods, but general enough to be used as a search term.
    
    Generate a JSON object that fits this type
    Unit may be something different than these, but should be a full word, not an abbreviation
    type Unit = 'teaspoon' | 'tbs' | 'cup' | 'oz' | 'lb' | 'ml' | 'l' | 'g' | 'kg' | 'whole' | 'round' |'package' | 'clove';
    type Time = 'hhh:mm:ss'
    type Amount = 'number' | 'number number/number'

    interface RecipeForm {
      title: string;
      description: string;
      preparationTime: Time;
      cookingTime: Time;
      servings: string;
      difficultyLevel: string;
      instructions: string[];
      ingredients?: {
        amount: Amount;
        unit: Unit;
        name: string;
        dbSearchName?: string;
        note?: string;
      }[];
    }
    Refrain from leaving any comments at all, and output only JSON. Again, this response should start with \`\`\`json and end with \`\`\`, meaning that it is only the json block representing the recipe`

export const IMAGE_PROMPT = `I have an image of a recipe and the following data type. Parse what is in the image and then transfer the contents into the following data type. 
    Please be very careful to be specific about the measurements, as you often mistake 4 for 2s in denominators. There will be some fields such as prep time and cooking time that will need to be inferred by you. The amount of servings will also need to be inferred. Even if you are not sure the amount of servings, make a concrete estimate.
    If you are unable to make a concrete estimate, use the integer 0. Make sure that any amounts are json strings, and that any amounts use fractions instead of decimals. Fractions should be in the form of "1 1/2", with no other special characters used than /
    Be precise in naming ingredients, and put any extra information related to it in the note field. If there is no note, dont define the field. 

    After you have named the ingredient, infer the most identifiable part of each ingredient's name and save that in the dbSearchName field. This field is going to be used to search against a database of ingredients so it is very important for it to be as accurate as possible.
    The dbSearchName should be a simpler version of the ingredient name, that is specific enough to differentiate it from other foods, but general enough to be used as a search term.
    
    Generate a JSON object that fits this type
    Unit may be something different than these, but should be a full word, not an abbreviation
    type Unit = 'teaspoon' | 'tbs' | 'cup' | 'oz' | 'lb' | 'ml' | 'l' | 'g' | 'kg' | 'whole' | 'round' |'package' | 'clove';
    type Time = 'hhh:mm:ss'
    type Amount = 'number' | 'number number/number'

    interface RecipeForm {
      title: string;
      description: string;
      preparationTime: Time;
      cookingTime: Time;
      servings: string;
      difficultyLevel: string;
      instructions: string[];
      ingredients?: {
        amount: Amount;
        unit: Unit;
        name: string;
        dbSearchName?: string;
        note?: string;
      }[];
    }
    Refrain from leaving any comments at all, and output only JSON. Again, this response should start with \`\`\`json and end with \`\`\`, meaning that it is only the json block representing the recipe`
