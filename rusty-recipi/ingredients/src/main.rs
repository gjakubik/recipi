// imports 
use axum::{
    body::Body,
    Router,
    extract::{Extension, Json, Path, State},
    handler::Handler,
    http::StatusCode,
    routing::{get, post, put, delete},
    response::Response,
};
use color_eyre::eyre::{self, Error};
use eyre::Report;
use sqlx::{FromRow, Pool, mysql::{MySql, MySqlPool}, Row, types::chrono::*};
use serde::{Deserialize, Serialize};
use std::{env, vec};
use std::sync::Arc;
use sqlx::*;
use tokio::*;
use tracing;

struct AppState{
    pool: Pool<MySql>,
}

#[derive(FromRow, Debug, Serialize, Deserialize)]
struct Ingredient {
    id: i32,
    name: String,
    calories: i32,
    created_at: Option<chrono::DateTime<Utc>>,
    updated_at: Option<chrono::DateTime<Utc>>,
}

#[derive(Deserialize, Serialize)]
struct AddIngredientJson {
    name: String,
    calories: i32,
}

/*
MAIN
- Sets up DB connections, registers API routes, and listens for requests
- Currently supports: 
    - /ingredient (get, post, put, delete)
*/
#[tokio::main]
async fn main() {
    // Set up DB connections
    let database_url = env::var("DATABASE_URL_DEV").expect("DATABASE_URL_DEV must be set");
    let pool = sqlx::MySqlPool::connect(&database_url)
    .await;

    let mut state;

    match pool {
        Ok(pool) => {
            println!("Connected to DB");
            state = AppState { pool };
        }
        Err(e) => {
            println!("Error connecting to DB: {:?}... exiting.", e);
            return;
        }
    }


    let router = Router::new()
        .route(
            "/ingredient",
            get(get_ingredient)
            .with_state(&state)
        );

    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
    .await
    .unwrap();
    tracing::debug!("listening on {}", listener.local_addr().unwrap());
    axum::serve(listener, router).await.unwrap();
}

// pass in params using State, get request body using JSOn 
async fn get_ingredient(
    State(state): State<AppState>,
    Path(name): Path<String>,
) -> Json<Ingredient> {
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
    .fetch_all(&state.pool).await;

    match result {
        Ok(query_out) => {
            for ingredient in query_out {
                println!("Found ingredient: id: {:?}, name: {:?}, calories: {:?}, created_at: {:?}, updated_at: {:?}", 
                ingredient.id, ingredient.name, ingredient.calories, ingredient.created_at, ingredient.updated_at);
                println!("Ingredient: {:?}\nJson ingredients: {:?}", ingredient, Json(Some(&ingredient)));
                return Json(ingredient);
            }
        }
        Err(e) => {
            println!("Error getting ingredient: {:?}", e);
            return Response::builder()
                .status(StatusCode::NOT_FOUND)
                .body(Body::from("Ingredient not found"))
                .unwrap();
        }
    }
}

async fn add_ingredient(pool: &sqlx::Pool<MySql>, ingredient: Ingredient) -> bool {
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