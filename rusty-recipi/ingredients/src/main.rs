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
use eyre::Report;
use sqlx::{FromRow, Pool, mysql::{MySql, MySqlPool, MySqlPoolOptions}, Row, types::chrono::*};
use serde::{Deserialize, Serialize};
use std::{env, vec, path::Path as FilePath, fs::File};
use std::io::BufReader;
use std::io::BufRead;
use sqlx::*;
use tokio::*;
use crate::data_access::*;
use crate::ingredient::*;

pub mod data_access;
pub mod ingredient;

#[tokio::main]
async fn main() {
    // Set up DB connections
    let database_url = env::var("DATABASE_URL_DEV").expect("DATABASE_URL_DEV must be set");
    let pool = sqlx::MySqlPool::connect(&database_url).await;

    let pool = match pool {
        Ok(pool) => pool,
        Err(e) => {
            println!("Error connecting to DB: {:?}", e);
            return;
        }
    };
    
    // ingredient deletion
    /*
    data_access::delete_all_ingredients(pool).await;
    println!("done deleting ingredients");
    return;
    */

    //println!("-------- FOUNDATION FOODS --------");
    //ingredient::ingest_foundation_foods(&pool).await; // works lets go
    
    println!("-------- SR LEGACY FOODS --------");
    ingredient::ingest_sr_legacy_foods(&pool).await;
    
    /*
    println!("-------- FNDDS FOODS --------");
    ingredient::ingest_fndds_foods(&pool).await;
    println!("-------- BRANDED FOODS --------");
    ingredient::ingest_branded_foods(&pool).await;
    */

    return; 

    let router = Router::new()
    .route(
        "/ingredient",
        post(add_ingredient_handler)
        .with_state(pool.clone())
    )
    .route(
        "/ingredient/:id",
        get(get_ingredient_handler_id)
        .put(update_ingredient_handler_id)
        .delete(delete_ingredient_handler_id)
        .with_state(pool.clone())
    )
    .route(
        "/ingredient/name/:name",
        get(get_ingredient_handler_name)
        .delete(delete_ingredient_handler_name)
        .put(update_ingredient_handler_name)
        .with_state(pool.clone())
    );

let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
.await
.unwrap();
axum::serve(listener, router).await.unwrap();

    return;

}

async fn get_ingredient_handler_id(
    Path(id): Path<i32>,
    State(pool): State<Pool<MySql>>
) -> impl IntoResponse {
    let result = get_ingredient_id(id, pool).await;

    for ingredient in result {
        println!("Ingredient: {:?}", ingredient);
        return (StatusCode::OK, Json(ingredient)).into_response();
    }
    (StatusCode::NOT_FOUND, "No ingredient found").into_response()
}

async fn get_ingredient_handler_name(
    Path(name): Path<String>,
    State(pool): State<Pool<MySql>>
) -> impl IntoResponse {
    let result = get_ingredient_name(name, pool).await;

    for ingredient in result {
        println!("Ingredient: {:?}", ingredient);
        return (StatusCode::OK, Json(ingredient)).into_response();
    }
    (StatusCode::NOT_FOUND, "No ingredient found").into_response()
}

async fn add_ingredient_handler(
    State(pool): State<Pool<MySql>>,
    Json(ingredient): Json<Ingredient>
) -> impl IntoResponse {
    let result = add_ingredient(&pool, &ingredient).await;

    if result {
        (StatusCode::CREATED, "Ingredient added").into_response()
    } else {
        (StatusCode::INTERNAL_SERVER_ERROR, "Error adding ingredient").into_response()
    }
}

async fn update_ingredient_handler_name(
    State(pool): State<Pool<MySql>>,
    Path(name): Path<String>,
    Json(ingredient): Json<Ingredient>
) -> impl IntoResponse {
    let result = update_ingredient_name(pool, ingredient, name).await;

    if result {
        (StatusCode::OK, "Ingredient updated").into_response()
    } else {
        (StatusCode::INTERNAL_SERVER_ERROR, "Error updating ingredient").into_response()
    }
}

async fn update_ingredient_handler_id(
    State(pool): State<Pool<MySql>>,
    Path(id): Path<i32>,
    Json(ingredient): Json<Ingredient>
) -> impl IntoResponse {
    let result = update_ingredient_id(pool, ingredient, id).await;

    if result {
        (StatusCode::OK, "Ingredient updated").into_response()
    } else {
        (StatusCode::INTERNAL_SERVER_ERROR, "Error updating ingredient").into_response()
    }
}

async fn delete_ingredient_handler_id(
    Path(id): Path<i32>,
    State(pool): State<Pool<MySql>>
) -> impl IntoResponse
{
    let result = delete_ingredient_id(id, pool).await;

    if result {
        (StatusCode::OK, "Ingredient deleted").into_response()
    } else {
        (StatusCode::INTERNAL_SERVER_ERROR, "Error deleting ingredient").into_response()
    }
}

async fn delete_ingredient_handler_name(
    Path(name): Path<String>,
    State(pool): State<Pool<MySql>>
) -> impl IntoResponse
{
    let result = delete_ingredient_name(name, pool).await;

    if result {
        (StatusCode::OK, "Ingredient deleted").into_response()
    } else {
        (StatusCode::INTERNAL_SERVER_ERROR, "Error deleting ingredient").into_response()
    }
}