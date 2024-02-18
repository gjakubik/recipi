pub struct Ingredient {
    id: i64,
    name: &str,
    calories: f32, // calories per 100g
    protein: f32, // protein per 100g
    fat: f32, // fat per 100g
    carbs: f32, // carbs per 100g
    portions: Vec<Option<Portion>>,
}

impl Ingredient {
    pub fn new(id: i64, name: &str, calories: f32, protein: f32, fat: f32, carbs: f32, portions: Vec<Option<Portion>>) -> Ingredient {
        Ingredient {
            id,
            name,
            calories,
            protein,
            fat,
            carbs,
            portions
        }
    }
}

impl fmt::Display for Ingredient {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "Ingredient: id: {}, name: {}, calories/100g: {}, protein/100g: {}, fat/100g: {}, carbs/100g: {}, portions: {:?}", self.id, self.name, self.calories, self.protein, self.fat, self.carbs, self.portions)
    }
}

struct Portion {
    measure_unit: String,
    measure_value: i32,
    gram_weight: f64,
}

impl fmt::Display for Portion {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "Portion: measure_unit: {}, measure_value: {}, gram_weight: {}", self.measure_unit, self.measure_value, self.gram_weight)
    }
}

// ingest from each dataset

// get ingredient from DB by ID

// post ingredient to DB