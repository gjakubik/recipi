// imports 
use color_eyre::eyre;
use sqlx::{FromRow, Pool, mysql::MySql, Row, Error, mysql::MySqlPool};
use std::env;
use sqlx::*;
use tokio::*;

#[derive(FromRow, Debug)]
struct Ingredient {
    id: i32,
    name: String,
    calories: i32,
}

#[tokio::main]
async fn main() -> eyre::Result<()>{
    // let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let database_url = String::from("mysql://3nno90jgzv2q4cuttol5:pscale_pw_SaVvwHjXm5WpR6AIVvK8KA7vHeQUxA9LfNsAeGuKMws@aws.connect.psdb.cloud/recipi");
    let pool = sqlx::MySqlPool::connect(&database_url)
    .await?;

    add_one::<MySql>(pool.clone()).await;


    get_ingredient(&pool, "Egg").await;
    return Ok(())

}

async fn add_one<MySql: sqlx::Database>(pool: sqlx::Pool<sqlx::MySql>) -> bool {
    let ingredient = Ingredient {
        id: 1,
        name: "Egg".to_string(),
        calories: 72,
    };

    return add_ingredient(&pool, ingredient, "ingredients").await;

}

async fn add_ingredient(pool: &sqlx::Pool<MySql>, ingredient: Ingredient, table: &str) -> bool {
    let res = sqlx::query(
        "INSERT INTO ingredients_test (
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
        "SELECT * FROM ingredients_test WHERE name = ?"
    )
    .bind(name)
    .fetch_all(pool)
    .await;

    match result {
        Ok(query_out) => {
            println!("Found ingredient: {:?}", query_out);
        }
        Err(e) => {
            println!("Error getting ingredient: {:?}", e);
        }
    }
}