-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "account" (
	"userId" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"providerAccountId" varchar(255) NOT NULL,
	"access_token" text,
	"expires_at" integer,
	"id_token" text,
	"refresh_token" text,
	"scope" varchar(255) DEFAULT NULL::character varying,
	"token_type" varchar(255) DEFAULT NULL::character varying,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"session_state" varchar(255) DEFAULT NULL::character varying,
	CONSTRAINT "account_provider_providerAccountId_key" UNIQUE("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "featureFlag" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(255) DEFAULT NULL::character varying,
	"isActive" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ingredients" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"description" varchar(255) DEFAULT NULL::character varying,
	"calories" double precision,
	"protein" double precision,
	"fat" double precision,
	"carbs" double precision,
	"processed" boolean DEFAULT false,
	"portions" json NOT NULL,
	"fdc_id" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "likes" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"recipe_id" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "menus" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"recipes" json,
	"creation_date" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"author_id" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipe_tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"recipe_id" varchar(255) NOT NULL,
	"tag_id" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipes" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"preparation_time" interval DEFAULT '00:00:00',
	"cooking_time" interval DEFAULT '00:00:00',
	"servings" varchar(50) NOT NULL,
	"difficulty_level" varchar(50) NOT NULL,
	"instructions" json NOT NULL,
	"creation_date" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"author_id" varchar(255) NOT NULL,
	"title_image" json,
	"helper_images" json,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"ingredients" json NOT NULL,
	"private" boolean DEFAULT false NOT NULL,
	"rating" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"recipe_id" varchar(255) NOT NULL,
	"rating" integer DEFAULT 0 NOT NULL,
	"text" text,
	"posted_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "saved_recipes" (
	"id" serial PRIMARY KEY NOT NULL,
	"recipe_id" integer NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"saved_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"sessionToken" varchar(255) PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "tags_name_key" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) DEFAULT NULL::character varying,
	"email" varchar(255) NOT NULL,
	"emailVerified" timestamp,
	"image" varchar(255) DEFAULT NULL::character varying,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"role" varchar(255) DEFAULT 'basic'::character varying,
	CONSTRAINT "user_email_key" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verificationToken" (
	"identifier" varchar(255) PRIMARY KEY NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "verificationToken_token_key" UNIQUE("token")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "account_userId_idx" ON "account" ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ingredients_description_idx" ON "ingredients" ("description");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ingredients_processed_idx" ON "ingredients" ("processed");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ingredients_id_idx" ON "ingredients" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "likes_user_id_idx" ON "likes" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "likes_recipe_id_idx" ON "likes" ("recipe_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "menus_author_id_idx" ON "menus" ("author_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "recipe_tags_recipe_id_idx" ON "recipe_tags" ("recipe_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "recipe_tags_tag_id_idx" ON "recipe_tags" ("tag_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "recipes_author_id_idx" ON "recipes" ("author_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "recipes_private_idx" ON "recipes" ("private");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "recipes_title_idx" ON "recipes" ("title");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "recipes_preparation_time_idx" ON "recipes" ("preparation_time");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "recipes_cooking_time_idx" ON "recipes" ("cooking_time");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "recipes_servings_idx" ON "recipes" ("servings");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "recipes_difficulty_level_idx" ON "recipes" ("difficulty_level");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "recipes_creation_date_idx" ON "recipes" ("creation_date");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "recipes_updated_at_idx" ON "recipes" ("updated_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "reviews_user_id_idx" ON "reviews" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "reviews_recipe_id_idx" ON "reviews" ("recipe_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "reviews_updated_at_idx" ON "reviews" ("updated_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "saved_recipes_recipe_id_idx" ON "saved_recipes" ("recipe_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "saved_recipes_user_id_idx" ON "saved_recipes" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "saved_recipes_saved_at_idx" ON "saved_recipes" ("saved_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_userId_idx" ON "session" ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "tags_name_idx" ON "tags" ("name");
*/