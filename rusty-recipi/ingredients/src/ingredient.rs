use serde::{Deserialize, Serialize};
use serde_json;
use std::fmt;
use std::{env, vec, path::Path as FilePath, fs::File};
use std::io::BufReader;
use std::io::BufRead;
use std::fmt::Display;

#[derive(Debug, Serialize, Deserialize)]
pub struct Ingredient2 {
    id: i64,
    name: String,
    calories: f32, // calories per 100g
    protein: f32, // protein per 100g
    fat: f32, // fat per 100g
    carbs: f32, // carbs per 100g
    portions: Vec<IngredientPortion>,
}

impl Ingredient2 {
    pub fn new(id: i64, name: &str, calories: f32, protein: f32, fat: f32, carbs: f32, portions: Vec<IngredientPortion>) -> Ingredient2 {
        Ingredient2 {
            id,
            name: name.to_string(),
            calories,
            protein,
            fat,
            carbs,
            portions
        }
    }
}

impl fmt::Display for Ingredient2 {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        // let portions = self.portions.iter().map(|Some(x)| x.to_string()).collect::<Vec<String>>().join(", ");
        let mut portions = String::from("");

        write!(f, "Ingredient: id: {}, name: {}, calories/100g: {}, protein/100g: {}, fat/100g: {}, carbs/100g: {}, portions: {:?}", self.id, self.name, self.calories, self.protein, self.fat, self.carbs, self.portions)
    }
}

#[derive(Debug, Serialize, Deserialize)]
struct IngredientPortion {
    measure_unit: String,
    measure_value: i32,
    gram_weight: f64,
}

impl fmt::Display for IngredientPortion {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "Portion: measure_unit: {}, measure_value: {}, gram_weight: {}", self.measure_unit, self.measure_value, self.gram_weight)
    }
}

fn raw_portion_to_ingredient_portion(raw_portion: &Option<FoodPortion>) -> IngredientPortion {
    match raw_portion {
        Some(p) => IngredientPortion {
            measure_unit: p.measureUnit.name.to_string(),
            measure_value: p.value as i32,
            gram_weight: p.gramWeight as f64,
        },
        None => IngredientPortion {
            measure_unit: "".to_string(),
            measure_value: 0,
            gram_weight: 0.0,
        }
    }
}

// ingest from each dataset
pub fn ingest_foundation_foods() {
    let mut ings: Vec<Ingredient2> = Vec::new();
    let path = FilePath::new("/Users/michaellee/recipi/.data/foundation_foods.json");
    let f = File::open(path).unwrap();
    let mut reader = BufReader::new(f);
    let mut lines = reader.lines();
    lines.next();
    
    for l in lines {
        let mut line = l.unwrap();
        line = line.trim_matches(',').to_string();
        let result: Result<Food, serde_json::Error> = serde_json::from_str(&line);
        match result {
            Ok(raw_food) => {
                let description = match raw_food.description {
                    Some(d) => d,
                    None => continue,
                };

                let protein_nutrient = raw_food.foodNutrients.iter().find(|x| x.nutrient.id == 1003);
                let protein = match protein_nutrient {
                    Some(p) => p.amount.unwrap_or(0.0),
                    None => 0.0,
                };

                let fat_nutrient = raw_food.foodNutrients.iter().find(|x| x.nutrient.id == 1004);
                let fat = match fat_nutrient {
                    Some(f) => f.amount.unwrap_or(0.0),
                    None => 0.0,
                };

                let carbs_nutrient = raw_food.foodNutrients.iter().find(|x| x.nutrient.id == 1005);
                let carbs = match carbs_nutrient {
                    Some(c) => c.amount.unwrap_or(0.0),
                    None => 0.0,
                };
                
                let calories_nutrient = raw_food.foodNutrients.iter().find(|x| x.nutrient.id == 1008);
                let calories = match calories_nutrient {
                    Some(c) => c.amount.unwrap_or(0.0),
                    None => 0.0,
                };

                let portions = raw_food.foodPortions.iter().map(|x| raw_portion_to_ingredient_portion(x)).collect::<Vec<IngredientPortion>>();

                let ing = Ingredient2::new(raw_food.fdcId.into(), &description, calories, protein, fat, carbs, portions);
                ings.push(ing);
            }
            Err(e) => {
                println!("Error: {:?}", e);
                continue;
            }
        }
    }

    println!("Number of ings: {}", ings.len());
    for ing in ings {
        println!("{}", ing);
    }
}

fn ingest_sr_legacy_foods() {
    let mut ings: Vec<Ingredient2> = Vec::new();
    let path = FilePath::new("/Users/michaellee/recipi/.data/sr_legacy_foods.json");
    let f = File::open(path).unwrap();
    let mut reader = BufReader::new(f);
    let mut lines = reader.lines();
    lines.next();
    
    // for l in lines {
    for i in 0..1 {
        let l = lines.nth(i);
        let mut line = l.unwrap();
        line = line.trim_matches(',').to_string();
        let result: Result<Food, serde_json::Error> = serde_json::from_str(&line);
        match result {
            Ok(raw_food) => {
                let description = match raw_food.description {
                    Some(d) => d,
                    None => continue,
                };

                let protein_nutrient = raw_food.foodNutrients.iter().find(|x| x.nutrient.id == 1003);
                let protein = match protein_nutrient {
                    Some(p) => p.amount.unwrap_or(0.0),
                    None => 0.0,
                };

                let fat_nutrient = raw_food.foodNutrients.iter().find(|x| x.nutrient.id == 1004);
                let fat = match fat_nutrient {
                    Some(f) => f.amount.unwrap_or(0.0),
                    None => 0.0,
                };

                let carbs_nutrient = raw_food.foodNutrients.iter().find(|x| x.nutrient.id == 1005);
                let carbs = match carbs_nutrient {
                    Some(c) => c.amount.unwrap_or(0.0),
                    None => 0.0,
                };
                
                let calories_nutrient = raw_food.foodNutrients.iter().find(|x| x.nutrient.id == 1008);
                let calories = match calories_nutrient {
                    Some(c) => c.amount.unwrap_or(0.0),
                    None => 0.0,
                };

                let portions = raw_food.foodPortions.iter().map(|x| raw_portion_to_ingredient_portion(x)).collect::<Vec<IngredientPortion>>();

                let ing = Ingredient2::new(raw_food.fdcId.into(), &description, calories, protein, fat, carbs, portions);
                ings.push(ing);
            }
            Err(e) => {
                println!("Error: {:?}", e);
                continue;
            }
        }
    }

    println!("Number of ings: {}", ings.len());
    for ing in ings {
        println!("{}", ing);
    }
}


#[derive(Debug, Serialize, Deserialize)]
struct FoodNutrientSource {
    id: Option<u32>,
    code: Option<String>,
    description: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
struct FoodNutrientDerivation {
    code: Option<String>,
    description: Option<String>,
    foodNutrientSource: Option<FoodNutrientSource>,
}

#[derive(Debug, Serialize, Deserialize)]
struct Nutrient {
    id: u32,
    number: String,
    name: String,
    rank: u32,
    unitName: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct FoodNutrient {
    #[serde(rename = "type")]
    type_: String,
    id: u32,
    nutrient: Nutrient,
    foodNutrientDerivation: FoodNutrientDerivation,
    max: Option<f32>,
    min: Option<f32>,
    median: Option<f32>,
    amount: Option<f32>,
}

#[derive(Debug, Serialize, Deserialize)]
struct MeasureUnit {
    id: u32,
    name: String,
    abbreviation: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct FoodPortion {
    id: u32,
    value: f32,
    measureUnit: MeasureUnit,
    modifier: Option<String>,
    gramWeight: f32,
    sequenceNumber: u32,
    minYearAcquired: u32,
    amount: f32,
}

#[derive(Debug, Serialize, Deserialize)]
struct FoodCategory {
    description: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
struct InputFood {
    foodClass: String,
    description: Option<String>,
    dataType: String,
    foodCategory: FoodCategory,
    fdcId: u32,
    publicationDate: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct InputFoods {
    id: u32,
    foodDescription: String,
    inputFood: InputFood,
}

#[derive(Debug, Serialize, Deserialize)]
struct NutrientConversionFactor {
    #[serde(rename = "type")]
    type_: String,
    value: Option<f32>,
    proteinValue: Option<f32>,
    fatValue: Option<f32>,
    carbohydrateValue: Option<f32>,
}

#[derive(Debug, Serialize, Deserialize)]
struct Food {
    foodClass: String,
    description: Option<String>,
    foodNutrients: Vec<FoodNutrient>,
    foodAttributes: Vec<String>,
    nutrientConversionFactors: Vec<NutrientConversionFactor>,
    ndbNumber: u32,
    foodCategory: FoodCategory,
    fdcId: u32,
    foodPortions: Vec<Option<FoodPortion>>,
    inputFoods: Vec<InputFoods>,
}
