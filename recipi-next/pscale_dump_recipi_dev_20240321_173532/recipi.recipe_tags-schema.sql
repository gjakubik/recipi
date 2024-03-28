CREATE TABLE `recipe_tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `recipe_id` varchar(255) NOT NULL,
  `tag_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `recipeTagID` (`id`),
  KEY `recipe_id_idx` (`recipe_id`),
  KEY `tag_id_idx` (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
