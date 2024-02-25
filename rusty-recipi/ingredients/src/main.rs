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
    
    // ingredient deletion -- WARNING: this will delete all ingredients in the DB
    // data_access::delete_all_ingredients(&pool).await;
    // println!("done deleting ingredients");

    println!("-------- SR LEGACY FOODS --------");
    ingredient::ingest_sr_legacy_foods(&pool).await;

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
    let result = delete_ingredient_id(id, &pool).await;

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