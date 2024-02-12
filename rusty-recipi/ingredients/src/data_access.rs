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


#[derive(FromRow, Debug, Serialize, Deserialize)]
pub struct Ingredient {
    id: Option<i32>,
    name: String,
    calories: i32,
    created_at: Option<chrono::DateTime<Utc>>,
    updated_at: Option<chrono::DateTime<Utc>>,
}

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
            name: row.get(1),
            calories: row.get(2),
            created_at: row.get(3),
            updated_at: row.get(4),
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
            name: row.get(1),
            calories: row.get(2),
            created_at: row.get(3),
            updated_at: row.get(4),
        }
    })
    .fetch_all(&pool).await;
    
    println!("Result: {:?}", result);

    result.expect("Error fetching ingredients")
}

pub async fn add_ingredient(pool: sqlx::Pool<MySql>, ingredient: Ingredient) -> bool {
    let res = sqlx::query(
        "INSERT INTO ingredients (
            name,
            calories)
        VALUES (?, ?)")
        .bind(ingredient.name)
        .bind(ingredient.calories)
        .execute(&pool).await;

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
        SET name = ?, calories = ?
        WHERE id = ?")
        .bind(ingredient.name)
        .bind(ingredient.calories)
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

pub async fn update_ingredient_name(pool: sqlx::Pool<MySql>, ingredient: Ingredient, name: String) -> bool {
    let res = sqlx::query(
        "UPDATE ingredients
        SET name = ?, calories = ?
        WHERE name = ?")
        .bind(ingredient.name)
        .bind(ingredient.calories)
        .bind(name)
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
    pool: sqlx::Pool<MySql>
) -> bool {
    let res = sqlx::query(
        "DELETE FROM ingredients WHERE id = ?"
    )
    .bind(id)
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

pub async fn delete_ingredient_name(
    name: String,
    pool: sqlx::Pool<MySql>
) -> bool {
    let res = sqlx::query(
        "DELETE FROM ingredients WHERE name = ?"
    )
    .bind(name)
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