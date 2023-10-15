-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	CONSTRAINT `categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `categoryID` UNIQUE(`id`),
	CONSTRAINT `categories_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `comments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` varchar(255),
	`recipe_id` varchar(255),
	`text` text,
	`comment_date` timestamp NOT NULL,
	CONSTRAINT `comments_id` PRIMARY KEY(`id`),
	CONSTRAINT `commentID` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `ingredients` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`amount` varchar(255) NOT NULL,
	`unit` varchar(255) NOT NULL,
	CONSTRAINT `ingredients_id` PRIMARY KEY(`id`),
	CONSTRAINT `ingredientID` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `likes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`recipe_id` varchar(255) NOT NULL,
	`like_date` timestamp NOT NULL,
	CONSTRAINT `likes_id` PRIMARY KEY(`id`),
	CONSTRAINT `likeID` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `recipe_categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`recipe_id` varchar(255) NOT NULL,
	`category_id` varchar(255) NOT NULL,
	CONSTRAINT `recipe_categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `recipeCategoryID` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `recipe_ingredients` (
	`id` int AUTO_INCREMENT NOT NULL,
	`recipe_id` int,
	`ingredient_id` int,
	CONSTRAINT `recipe_ingredients_id` PRIMARY KEY(`id`),
	CONSTRAINT `recipeIngredientID` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `recipes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`preparation_time` varchar(50),
	`cooking_time` varchar(50),
	`servings` int,
	`difficulty_level` varchar(50),
	`instructions` text,
	`creation_date` timestamp DEFAULT now(),
	`author_id` varchar(255),
	CONSTRAINT `recipes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`username` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`profile_picture` varchar(255),
	`registration_date` timestamp NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `userID` UNIQUE(`id`),
	CONSTRAINT `users_username_unique` UNIQUE(`username`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`),
	CONSTRAINT `email_idx` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE INDEX `name_idx` ON `categories` (`name`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `comments` (`user_id`);--> statement-breakpoint
CREATE INDEX `recipe_id_idx` ON `comments` (`recipe_id`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `ingredients` (`name`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `likes` (`user_id`);--> statement-breakpoint
CREATE INDEX `recipe_id_idx` ON `likes` (`recipe_id`);--> statement-breakpoint
CREATE INDEX `recipe_id_idx` ON `recipe_categories` (`recipe_id`);--> statement-breakpoint
CREATE INDEX `author_id_idx` ON `recipe_ingredients` (`recipe_id`);--> statement-breakpoint
CREATE INDEX `username_idx` ON `users` (`username`);
*/