CREATE TABLE `saved_recipes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `recipe_id` int NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `saved_at` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `recipe_idx` (`recipe_id`),
  KEY `user_idx` (`user_id`),
  KEY `saved_at_idx` (`saved_at`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
