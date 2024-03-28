CREATE TABLE `account` (
  `userId` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `provider` varchar(255) NOT NULL,
  `providerAccountId` varchar(255) NOT NULL,
  `access_token` text,
  `expires_at` int DEFAULT NULL,
  `id_token` text,
  `refresh_token` text,
  `scope` varchar(255) DEFAULT NULL,
  `token_type` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `session_state` varchar(255) DEFAULT NULL,
  UNIQUE KEY `accounts__provider__providerAccountId__idx` (`provider`,`providerAccountId`),
  KEY `accounts__userId__idx` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `featureFlag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `ingredients` (
  `id` varchar(36) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `calories` float DEFAULT NULL,
  `protein` float DEFAULT NULL,
  `fat` float DEFAULT NULL,
  `carbs` float DEFAULT NULL,
  `processed` tinyint(1) DEFAULT '0',
  `portions` json NOT NULL,
  `fdc_id` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `description_idx` (`description`),
  KEY `processed_idx` (`processed`),
  KEY `id_idx` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL,
  `recipe_id` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `likeID` (`id`),
  KEY `user_id_idx` (`user_id`),
  KEY `recipe_id_idx` (`recipe_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `menus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `recipes` json DEFAULT NULL,
  `creation_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `author_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `author_idx` (`author_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `recipe_tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `recipe_id` varchar(255) NOT NULL,
  `tag_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `recipeTagID` (`id`),
  KEY `recipe_id_idx` (`recipe_id`),
  KEY `tag_id_idx` (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `recipes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `preparation_time` time DEFAULT '00:00:00',
  `cooking_time` time DEFAULT '00:00:00',
  `servings` varchar(50) NOT NULL,
  `difficulty_level` varchar(50) NOT NULL,
  `instructions` json NOT NULL,
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `author_id` varchar(255) NOT NULL,
  `title_image` json,
  `helper_images` json,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ingredients` json NOT NULL,
  `private` tinyint(1) NOT NULL DEFAULT '0',
  `rating` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `author_idx` (`author_id`),
  KEY `is_private_idx` (`private`),
  KEY `title_idx` (`title`),
  KEY `preparation_time_idx` (`preparation_time`),
  KEY `cooking_time_idx` (`cooking_time`),
  KEY `servings_idx` (`servings`),
  KEY `difficulty_level_idx` (`difficulty_level`),
  KEY `creation_date_idx` (`creation_date`),
  KEY `updated_at_idx` (`updated_at`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL,
  `recipe_id` varchar(255) NOT NULL,
  `rating` int NOT NULL DEFAULT '0',
  `text` text,
  `posted_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`),
  KEY `recipe_id_idx` (`recipe_id`),
  KEY `updated_at_idx` (`updated_at`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `saved_recipes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `recipe_id` int NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `saved_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `recipe_idx` (`recipe_id`),
  KEY `user_idx` (`user_id`),
  KEY `saved_at_idx` (`saved_at`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `session` (
  `sessionToken` varchar(255) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `expires` datetime NOT NULL,
  UNIQUE KEY `sessions__sessionToken__idx` (`sessionToken`),
  KEY `sessions__userId__idx` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categories_name_unique` (`name`),
  KEY `name_idx` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `user` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `emailVerified` timestamp NULL DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `role` varchar(255) DEFAULT 'basic',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users__email__idx` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `verificationToken` (
  `identifier` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`identifier`),
  UNIQUE KEY `verification_tokens__token__idx` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;