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
use sqlx::{FromRow, Pool, mysql::{MySql, MySqlPool}, Row, types::chrono::*};
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
/*
MAIN
- Sets up DB connections, registers API routes, and listens for requests
- Currently supports: 
    - /ingredient (get, post, put, delete)
*/
#[tokio::main]
async fn main() {
    println!("-------- FOUNDATION FOODS --------");
    ingredient::ingest_foundation_foods(); // works lets go
    println!("-------- SR LEGACY FOODS --------");
    ingredient::ingest_sr_legacy_foods();
    println!("-------- FNDDS FOODS --------");
    ingredient::ingest_fndds_foods();
    println!("-------- BRANDED FOODS --------");
    ingredient::ingest_branded_foods();

    return;

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
}