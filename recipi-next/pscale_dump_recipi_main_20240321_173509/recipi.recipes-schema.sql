CREATE TABLE `recipes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `preparation_time` time DEFAULT '00:00:00',
  `cooking_time` time DEFAULT '00:00:00',
  `servings` varchar(50) NOT NULL,
  `difficulty_level` varchar(50) NOT NULL,
  `instructions` json NOT NULL DEFAULT (_utf8mb4'[]'),
  `creation_date` timestamp NOT NULL DEFAULT (now()),
  `author_id` varchar(255) NOT NULL,
  `title_image` json DEFAULT (_utf8mb4'null'),
  `helper_images` json DEFAULT (_utf8mb4'null'),
  `updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  `ingredients` json NOT NULL DEFAULT (_utf8mb4'[]'),
  `private` tinyint(1) NOT NULL DEFAULT '0',
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
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;