CREATE TABLE `ingredients` (
  `id` varchar(36) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `calories` float DEFAULT NULL,
  `protein` float DEFAULT NULL,
  `fat` float DEFAULT NULL,
  `carbs` float DEFAULT NULL,
  `processed` tinyint(1) DEFAULT '0',
  `portions` json NOT NULL DEFAULT (_utf8mb4'[]'),
  `fdc_id` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `description_idx` (`description`),
  KEY `processed_idx` (`processed`),
  KEY `id_idx` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
