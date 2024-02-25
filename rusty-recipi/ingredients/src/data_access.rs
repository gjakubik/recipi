use axum::{
    body::Body,
    Router,
    extract::{Extension, Path, Query, State},
    handler::Handler,
    http::StatusCode,
    response::IntoResponse,
    routing::{get, post, put, delete},
    Json,
    response::Response,
};
use color_eyre::eyre::{self, Error};
use sqlx::{FromRow, mysql::{MySql}, Row, types::chrono::*};
use serde::{Deserialize, Serialize};
use crate::ingredient::Ingredient;


pub async fn get_ingredient_id(
    id: i32,
    pool: sqlx::Pool<MySql>
) -> Vec<Ingredient> {
    let result = sqlx::query(
        "SELECT * FROM ingredients WHERE id = ?"
    )
    .bind(id)
    .map(|row: sqlx::mysql::MySqlRow| {
        Ingredient {
            id: row.get(0),
            description: row.get(1),
            calories: row.get(2),
            protein: row.get(3),
            fat: row.get(4),
            carbs: row.get(5),
            portions: row.get(7),
            fdc_id: row.get(8),
        }
    })
    .fetch_all(&pool).await;
    
    println!("Result: {:?}", result);

    result.expect("Error fetching ingredients")
}

pub async fn get_ingredient_name(
    name: String,
    pool: sqlx::Pool<MySql>
) ->  Vec<Ingredient>{
    let result = sqlx::query(
        "SELECT * FROM ingredients WHERE name = ?"
    )
    .bind(&name)
    .map(|row: sqlx::mysql::MySqlRow| {
        Ingredient {
            id: row.get(0),
            description: row.get(1),
            calories: row.get(2),
            protein: row.get(3),
            fat: row.get(4),
            carbs: row.get(5),
            portions: row.get(6),
            fdc_id: row.get(7),
        }
    })
    .fetch_all(&pool).await;
    
    println!("Result: {:?}", result);

    result.expect("Error fetching ingredients")
}

pub async fn add_ingredient(pool: &sqlx::Pool<MySql>, ingredient: &Ingredient) -> bool {
    let res = sqlx::query(
        "INSERT INTO ingredients (
            id,
            description,
            calories,
            protein,
            fat,
            carbs,
            processed
            portions,
            fdc_id
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")
        .bind(&ingredient.id)
        .bind(&ingredient.description)
        .bind(&ingredient.calories)
        .bind(&ingredient.protein)
        .bind(&ingredient.fat)
        .bind(&ingredient.carbs)
        .bind(false)
        .bind(&ingredient.portions)
        .bind(&ingredient.fdc_id)
        .execute(pool).await;

    println!("Result: {:?}", res);

    match res {
        Ok(_) => {
            return true;
        }
        Err(e) => {
            println!("Error inserting ingredient: {:?}", e);
            return false;
        }
    }
}

pub async fn update_ingredient_id(pool: sqlx::Pool<MySql>, ingredient: Ingredient, id: i32) -> bool {
    let res = sqlx::query(
        "UPDATE ingredients
        SET name = ?, calories = ?, protein = ?, fat = ?, carbs = ?
        WHERE id = ?")
        .bind(ingredient.description)
        .bind(ingredient.calories)
        .bind(ingredient.protein)
        .bind(ingredient.fat)
        .bind(ingredient.carbs)
        .bind(id)
        .execute(&pool).await;

    println!("Result: {:?}", res);

    match res {
        Ok(_) => {
            return true;
        }
        Err(e) => {
            println!("Error updating ingredient: {:?}", e);
            return false;
        }
    }
}

pub async fn update_ingredient_name(pool: sqlx::Pool<MySql>, ingredient: Ingredient, description: String) -> bool {
    let res = sqlx::query(
        "UPDATE ingredients
        SET description = ?, calories = ?, protein = ?, fat = ?, carbs = ?
        WHERE description = ?")
        .bind(ingredient.description)
        .bind(ingredient.calories)
        .bind(ingredient.protein)
        .bind(ingredient.fat)
        .bind(ingredient.carbs)
        .bind(description)
        .execute(&pool).await;

    println!("Result: {:?}", res);

    match res {
        Ok(_) => {
            return true;
        }
        Err(e) => {
            println!("Error updating ingredient: {:?}", e);
            return false;
        }
    }
}

pub async fn delete_ingredient_id(
    id: i32,
    pool: &sqlx::Pool<MySql>
) -> bool {
    let res = sqlx::query(
        "DELETE FROM ingredients WHERE id = ?"
    )
    .bind(id)
    .execute(pool).await;

    println!("Result: {:?}", res);

    match res {
        Ok(_) => {
            return true;
        }
        Err(e) => {
            println!("Error deleting ingredient: {:?}", e);
            return false;
        }
    }
}

pub async fn delete_ingredient_name(
    description: String,
    pool: sqlx::Pool<MySql>
) -> bool {
    let res = sqlx::query(
        "DELETE FROM ingredients WHERE description = ?"
    )
    .bind(description)
    .execute(&pool).await;

    println!("Result: {:?}", res);

    match res {
        Ok(_) => {
            return true;
        }
        Err(e) => {
            println!("Error deleting ingredient: {:?}", e);
            return false;
        }
    }
}

pub async fn delete_all_ingredients(
    pool: &sqlx::Pool<MySql>
) {
    sqlx::query(
        "DELETE FROM ingredients;"
    )
    .execute(pool).await;
}