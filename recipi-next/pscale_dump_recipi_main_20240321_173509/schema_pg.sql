CREATE TABLE "account" (
  "userId" varchar(255) NOT NULL,
  "type" varchar(255) NOT NULL,
  "provider" varchar(255) NOT NULL,
  "providerAccountId" varchar(255) NOT NULL,
  "access_token" text,
  "expires_at" int DEFAULT NULL,
  "id_token" text,
  "refresh_token" text,
  "scope" varchar(255) DEFAULT NULL,
  "token_type" varchar(255) DEFAULT NULL,
  "created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  "session_state" varchar(255) DEFAULT NULL,
  UNIQUE ("provider", "providerAccountId")
);
CREATE INDEX "account_userId_idx" ON "account" ("userId");

CREATE TABLE "comments" (
  "id" SERIAL PRIMARY KEY,
  "user_id" varchar(255) DEFAULT NULL,
  "recipe_id" varchar(255) DEFAULT NULL,
  "text" text,
  "posted_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX "comments_user_id_idx" ON "comments" ("user_id");
CREATE INDEX "comments_recipe_id_idx" ON "comments" ("recipe_id");

CREATE TABLE "featureFlag" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "description" varchar(255) DEFAULT NULL,
  "isActive" boolean NOT NULL DEFAULT false
);

CREATE TABLE "ingredients" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(255) DEFAULT NULL,
  "calories" int DEFAULT NULL,
  "created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX "ingredients_name_idx" ON "ingredients" ("name");

CREATE TABLE "likes" (
  "id" SERIAL PRIMARY KEY,
  "user_id" varchar(255) NOT NULL,
  "recipe_id" varchar(255) NOT NULL,
  "created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX "likes_user_id_idx" ON "likes" ("user_id");
CREATE INDEX "likes_recipe_id_idx" ON "likes" ("recipe_id");

CREATE TABLE "menus" (
  "id" SERIAL PRIMARY KEY,
  "title" varchar(255) NOT NULL,
  "description" text,
  "recipes" json DEFAULT NULL,
  "creation_date" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  "author_id" varchar(255) NOT NULL
);
CREATE INDEX "menus_author_id_idx" ON "menus" ("author_id");

CREATE TABLE "recipe_tags" (
  "id" SERIAL PRIMARY KEY,
  "recipe_id" varchar(255) NOT NULL,
  "tag_id" varchar(255) NOT NULL
);
CREATE INDEX "recipe_tags_recipe_id_idx" ON "recipe_tags" ("recipe_id");
CREATE INDEX "recipe_tags_tag_id_idx" ON "recipe_tags" ("tag_id");

CREATE TABLE "recipes" (
  "id" SERIAL PRIMARY KEY,
  "title" varchar(255) NOT NULL,
  "description" text,
  "preparation_time" interval DEFAULT '00:00:00',
  "cooking_time" interval DEFAULT '00:00:00',
  "servings" varchar(50) NOT NULL,
  "difficulty_level" varchar(50) NOT NULL,
  "instructions" json NOT NULL,
  "creation_date" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "author_id" varchar(255) NOT NULL,
  "title_image" json,
  "helper_images" json,
  "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "ingredients" json NOT NULL,
  "private" boolean NOT NULL DEFAULT false
);
CREATE INDEX "recipes_author_id_idx" ON "recipes" ("author_id");
CREATE INDEX "recipes_private_idx" ON "recipes" ("private");
CREATE INDEX "recipes_title_idx" ON "recipes" ("title");
CREATE INDEX "recipes_preparation_time_idx" ON "recipes" ("preparation_time");
CREATE INDEX "recipes_cooking_time_idx" ON "recipes" ("cooking_time");
CREATE INDEX "recipes_servings_idx" ON "recipes" ("servings");
CREATE INDEX "recipes_difficulty_level_idx" ON "recipes" ("difficulty_level");
CREATE INDEX "recipes_creation_date_idx" ON "recipes" ("creation_date");
CREATE INDEX "recipes_updated_at_idx" ON "recipes" ("updated_at");

CREATE TABLE "session" (
  "sessionToken" varchar(255) NOT NULL PRIMARY KEY,
  "userId" varchar(255) NOT NULL,
  "expires" timestamp NOT NULL
);
CREATE INDEX "session_userId_idx" ON "session" ("userId");

CREATE TABLE "tags" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  UNIQUE ("name")
);
CREATE INDEX "tags_name_idx" ON "tags" ("name");

CREATE TABLE "user" (
  "id" varchar(255) NOT NULL PRIMARY KEY,
  "name" varchar(255) DEFAULT NULL,
  "email" varchar(255) NOT NULL,
  "emailVerified" timestamp NULL DEFAULT NULL,
  "image" varchar(255) DEFAULT NULL,
  "created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  "role" varchar(255) DEFAULT 'basic',
  UNIQUE ("email")
);
CREATE INDEX "user_name_idx" ON "user" ("name");

CREATE TABLE "verificationToken" (
  "identifier" varchar(255) NOT NULL PRIMARY KEY,
  "token" varchar(255) NOT NULL,
  "expires" timestamp DEFAULT NULL,
  "created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE ("token")
);