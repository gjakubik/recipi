use serde::{Deserialize, Serialize};
use serde_json;
use sqlx::pool;
use std::fmt;
use std::{env, vec, path::Path as FilePath, fs::File};
use std::io::BufReader;
use std::io::BufRead;
use std::fmt::Display;
use sqlx::{FromRow, mysql::{MySql}, Row, types::chrono::*};

use crate::data_access;


#[derive(Debug, Serialize, Deserialize)]
pub struct Ingredient {
    pub id: i64,
    pub description: String,
    pub calories: f32, // calories per 100g
    pub protein: f32, // protein per 100g
    pub fat: f32, // fat per 100g
    pub carbs: f32, // carbs per 100g
}

impl Ingredient {
    pub fn new(id: i64, description: &str, calories: f32, protein: f32, fat: f32, carbs: f32) -> Ingredient {
        Ingredient {
            id,
            description: description.to_string(),
            calories,
            protein,
            fat,
            carbs,
        }
    }
}

impl fmt::Display for Ingredient {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "Ingredient: id: {}, name: {}, calories/100g: {}, protein/100g: {}, fat/100g: {}, carbs/100g: {}", self.id, self.description, self.calories, self.protein, self.fat, self.carbs)
    }
}

// ingest from each dataset
pub async fn ingest_foundation_foods(pool: &sqlx::Pool<MySql>) {
    let path = FilePath::new("/Users/michaellee/recipi/.data/foundation_foods.json");
    let f = File::open(path).unwrap();
    let mut reader = BufReader::new(f);
    let mut lines = reader.lines();
    lines.next();
    
    let mut num = 0; 

    for l in lines {
        let mut line = l.unwrap();
        line = line.trim_matches(',').to_string();
        let result: Result<Food, serde_json::Error> = serde_json::from_str(&line);
        match result {
            Ok(raw_food) => {
                let ingredient = ingredient_from_raw_food(raw_food);
                match ingredient {
                    Some(i) => {
                        if data_access::add_ingredient(pool, &i).await {
                            println!("Added ingredient: {}", i);
                        } else {
                            println!("Error: Could not add ingredient: {}", i);
                        }
                    }
                    None => {
                        println!("Error: Could not create ingredient from raw food");
                        continue;
                    }
                }
                num += 1;
            }
            Err(e) => {
                println!("Error: {:?}", e);
                continue;
            }
        }
    }

    println!("Number of foundation foods: {}", num);
}

pub async fn ingest_sr_legacy_foods(pool: &sqlx::Pool<MySql>) {
    let path = FilePath::new("/Users/michaellee/recipi/.data/sr_legacy_foods.json");
    let f = File::open(path).unwrap();
    let mut reader = BufReader::new(f);
    let mut lines = reader.lines();
    lines.next();
    
    let mut num = 0;

    for l in lines {
        let mut line = l.unwrap();
        line = line.trim_matches(',').to_string();
        let result: Result<Food, serde_json::Error> = serde_json::from_str(&line);
        match result {
            Ok(raw_food) => {
                let ingredient = ingredient_from_raw_food(raw_food);
                match ingredient {
                    Some(i) => {
                        if data_access::add_ingredient(pool, &i).await {
                            // println!("Added ingredient: {}", i);
                        } else {
                            println!("Error: Could not add ingredient: {}", i);
                        }
                    }
                    None => {
                        println!("Error: Could not create ingredient from raw food");
                        continue;
                    }
                }
                num += 1;
            }
            Err(e) => {
                println!("Error: {:?}", e);
                continue;
            }
        }
    }

    println!("Number of sr legacy foods: {}", num);
}

pub async fn ingest_fndds_foods(pool: &sqlx::Pool<MySql>) {
    let path = FilePath::new("/Users/michaellee/recipi/.data/fndds_foods.json");
    let f = File::open(path).unwrap();
    let mut reader = BufReader::new(f);
    let mut lines = reader.lines();
    lines.next();
    
    let mut num = 0;

    for l in lines {
        let mut line = l.unwrap();
        line = line.trim_matches(',').to_string();
        let result: Result<Food, serde_json::Error> = serde_json::from_str(&line);
        match result {
            Ok(raw_food) => {
                let ingredient = ingredient_from_raw_food(raw_food);
                match ingredient {
                    Some(i) => {
                        if data_access::add_ingredient(pool, &i).await {
                            // println!("Added ingredient: {}", i);
                        } else {
                            println!("Error: Could not add ingredient: {}", i);
                        }
                    }
                    None => {
                        println!("Error: Could not create ingredient from raw food");
                        continue;
                    }
                }
                num += 1;
            }
            Err(e) => {
                println!("Error: {:?}", e);
                continue;
            }
        }
    }

    println!("Number of fndds foods: {}", num);
}

pub async fn ingest_branded_foods(pool: &sqlx::Pool<MySql>) {
    let path = FilePath::new("/Users/michaellee/recipi/.data/branded_foods.json");
    let f = File::open(path).unwrap();
    let mut reader = BufReader::new(f);
    let mut lines = reader.lines();
    lines.next();
    
    let mut num = 0;

    for l in lines {
        let mut line = l.unwrap();
        line = line.trim_matches(',').to_string();
        let result: Result<Food, serde_json::Error> = serde_json::from_str(&line);
        match result {
            Ok(raw_food) => {
                let ingredient = ingredient_from_raw_food(raw_food);
                match ingredient {
                    Some(i) => {
                        if data_access::add_ingredient(pool, &i).await {
                            // println!("Added ingredient: {}", i);
                        } else {
                            println!("Error: Could not add ingredient: {}", i);
                        }
                    }
                    None => {
                        println!("Error: Could not create ingredient from raw food");
                        continue;
                    }
                }
                num += 1;
            }
            Err(e) => {
                println!("Error: {:?}", e);
                continue;
            }
        }
    }

    println!("Number of branded foods: {}", num);
}

fn ingredient_from_raw_food(raw_food: Food) -> Option<Ingredient>
{
    let description = match raw_food.description {
        Some(d) => d,
        None => return None,
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

    Some(Ingredient::new(raw_food.fdcId.into(), &description, calories, protein, fat, carbs))
}

#[derive(Debug, Serialize, Deserialize)]
struct FoodAttribute {
    id: Option<u32>,
    name: Option<String>,
    description: Option<String>,
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
    rank: Option<u32>,
    unitName: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
struct FoodNutrient {
    #[serde(rename = "type")]
    type_: String,
    id: u32,
    nutrient: Nutrient,
    foodNutrientDerivation: Option<FoodNutrientDerivation>,
    max: Option<f32>,
    min: Option<f32>,
    median: Option<f32>,
    amount: Option<f32>,
}

#[derive(Debug, Serialize, Deserialize)]
struct MeasureUnit {
    id: u32,
    name: Option<String>,
    abbreviation: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
struct FoodPortion {
    id: u32,
    value: Option<f32>,
    measureUnit: Option<MeasureUnit>,
    modifier: Option<String>,
    gramWeight: Option<f32>,
    sequenceNumber: Option<u32>,
    minYearAcquired: Option<u32>,
    amount: Option<f32>,
}

#[derive(Debug, Serialize, Deserialize)]
struct FoodCategory {
    description: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
struct InputFood {
    foodClass: Option<String>,
    description: Option<String>,
    dataType: Option<String>,
    foodCategory: Option<FoodCategory>,
    fdcId: u32,
    publicationDate: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
struct InputFoods {
    id: Option<u32>,
    foodDescription: Option<String>,
    inputFood: Option<InputFood>,
}

#[derive(Debug, Serialize, Deserialize)]
struct NutrientConversionFactor {
    #[serde(rename = "type")]
    type_: Option<String>,
    value: Option<f32>,
    proteinValue: Option<f32>,
    fatValue: Option<f32>,
    carbohydrateValue: Option<f32>,
}

#[derive(Debug, Serialize, Deserialize)]
struct Food {
    foodClass: Option<String>,
    description: Option<String>,
    foodNutrients: Vec<FoodNutrient>,
    foodAttributes: Vec<Option<FoodAttribute>>,
    nutrientConversionFactors: Option<Vec<Option<NutrientConversionFactor>>>,
    ndbNumber: Option<u32>,
    foodCategory: Option<FoodCategory>,
    fdcId: u32,
    foodPortions: Option<Vec<Option<FoodPortion>>>,
    inputFoods: Option<Vec<InputFoods>>,
    #[serde(rename = "fdcId")]
    fdc_id__: Option<u32>,
    dataType: Option<String>,
}