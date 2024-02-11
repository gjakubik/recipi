// imports 
use color_eyre::eyre;
use sqlx::{Error, FromRow, Pool, mysql::{MySql, MySqlPool}, Row, types::chrono::*};
use std::env;
use sqlx::*;
use tokio::*;

#[derive(FromRow, Debug)]
struct Ingredient {
    id: i32,
    name: String,
    calories: i32,
    created_at: Option<chrono::DateTime<Utc>>,
    updated_at: Option<chrono::DateTime<Utc>>,
}

#[tokio::main]
async fn main() -> eyre::Result<()>{
    let database_url = env::var("DATABASE_URL_DEV").expect("DATABASE_URL_DEV must be set");
    let pool = sqlx::MySqlPool::connect(&database_url)
    .await?;

    add_one::<MySql>(pool.clone()).await;


    get_ingredient(&pool, "Egg").await;
    return Ok(())

}

async fn add_one<MySql: sqlx::Database>(pool: sqlx::Pool<sqlx::MySql>) -> bool {
    let ingredient = Ingredient {
        id: 2,
        name: "Egg".to_string(),
        calories: 72,
        created_at: None,
        updated_at: None,
    };

    return add_ingredient(&pool, ingredient, "ingredients_table").await;

}

async fn add_ingredient(pool: &sqlx::Pool<MySql>, ingredient: Ingredient, table: &str) -> bool {
    let res = sqlx::query(
        "INSERT INTO ingredients (
            id,
            name,
            calories)
        VALUES (?, ?, ?)")
        .bind(ingredient.id)
        .bind(ingredient.name)
        .bind(ingredient.calories)
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

async fn get_ingredient(pool: &sqlx::Pool<MySql>, name: &str) {
    let result = sqlx::query(
        "SELECT * FROM ingredients WHERE name = ?"
    )
    .bind(name)
    .map(|row: sqlx::mysql::MySqlRow| {
        Ingredient {
            id: row.get(0),
            name: row.get(1),
            calories: row.get(2),
            created_at: row.get(3),
            updated_at: row.get(4),
        }
    })
    .fetch_all(pool).await;

    match result {
        Ok(query_out) => {
            for ingredient in query_out.iter() {
                println!("Found ingredient: id: {:?}, name: {:?}, calories: {:?}, created_at: {:?}, updated_at: {:?}", 
                ingredient.id, ingredient.name, ingredient.calories, ingredient.created_at, ingredient.updated_at);
            }
        }
        Err(e) => {
            println!("Error getting ingredient: {:?}", e);
        }
    }
}