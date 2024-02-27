export const TEXT_PROMPT = `I have text of a recipe and the following data type. Parse what is in the text and then transfer the contents into the following data type. 
    Please be very careful to be specific about the measurements, as you often mistake 4 for 2s in denominators. There will be some fields such as prep time and cooking time that will need to be inferred by you. The amount of servings will also need to be inferred. Even if you are not sure the amount of servings, make a concrete estimate.
    If you are unable to make a concrete estimate, use the integer 0. Make sure that any amounts are json strings, and that any amounts use fractions instead of decimals. Fractions should be in the form of "1 1/2", with no other special characters used than /
    Be precise in naming ingredients, and put any extra information related to it in the note field. If there is no note, dont define the field. 

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
        note?: string;
      }[];
    }
    Refrain from leaving any comments at all, and output only JSON. Again, this response should start with \`\`\`json and end with \`\`\`, meaning that it is only the json block representing the recipe`

export const URL_PROMPT = `I have html of a website containing a recipe, and the following data type. Parse what is in the html and then transfer the contents into the following data type. 
    Please be very careful to be specific about the measurements, as you often mistake 4 for 2s in denominators. There will be some fields such as prep time and cooking time that will need to be inferred by you. The amount of servings will also need to be inferred. Even if you are not sure the amount of servings, make a concrete estimate.
    If you are unable to make a concrete estimate, use the integer 0. Make sure that any amounts are json strings, and that any amounts use fractions instead of decimals. Fractions should be in the form of "1 1/2", with no other special characters used than /
    Be precise in naming ingredients, and put any extra information related to it in the note field. If there is no note, dont define the field. 

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
        note?: string;
      }[];
    }
    Refrain from leaving any comments at all, and output only JSON. Again, this response should start with \`\`\`json and end with \`\`\`, meaning that it is only the json block representing the recipe`

export const IMAGE_PROMPT = `I have an image of a recipe and the following data type. Parse what is in the image and then transfer the contents into the following data type. 
    Please be very careful to be specific about the measurements, as you often mistake 4 for 2s in denominators. There will be some fields such as prep time and cooking time that will need to be inferred by you. The amount of servings will also need to be inferred. Even if you are not sure the amount of servings, make a concrete estimate.
    If you are unable to make a concrete estimate, use the integer 0. Make sure that any amounts are json strings, and that any amounts use fractions instead of decimals. Fractions should be in the form of "1 1/2", with no other special characters used than /
    Be precise in naming ingredients, and put any extra information related to it in the note field. If there is no note, dont define the field. 

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
        note?: string;
      }[];
    }
    Refrain from leaving any comments at all, and output only JSON. Again, this response should start with \`\`\`json and end with \`\`\`, meaning that it is only the json block representing the recipe`
