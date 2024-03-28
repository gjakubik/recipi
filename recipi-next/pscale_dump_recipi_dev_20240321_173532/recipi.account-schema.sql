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
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  `session_state` varchar(255) DEFAULT NULL,
  UNIQUE KEY `accounts__provider__providerAccountId__idx` (`provider`,`providerAccountId`),
  KEY `accounts__userId__idx` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
