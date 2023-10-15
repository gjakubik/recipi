import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, unique, varchar, text, int, timestamp, index, datetime } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const accounts = mysqlTable("accounts", {
	id: varchar("id", { length: 255 }).notNull(),
	userId: varchar("userId", { length: 255 }).notNull(),
	type: varchar("type", { length: 255 }).notNull(),
	provider: varchar("provider", { length: 255 }).notNull(),
	providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
	accessToken: text("access_token"),
	expiresIn: int("expires_in"),
	idToken: text("id_token"),
	refreshToken: text("refresh_token"),
	refreshTokenExpiresIn: int("refresh_token_expires_in"),
	scope: varchar("scope", { length: 255 }),
	tokenType: varchar("token_type", { length: 255 }),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
(table) => {
	return {
		accountsId: primaryKey(table.id),
		accountsProviderProviderAccountIdIdx: unique("accounts__provider__providerAccountId__idx").on(table.provider, table.providerAccountId),
	}
});

export const categories = mysqlTable("categories", {
	id: int("id").autoincrement().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
},
(table) => {
	return {
		nameIdx: index("name_idx").on(table.name),
		categoriesId: primaryKey(table.id),
		categoriesNameUnique: unique("categories_name_unique").on(table.name),
		categoryId: unique("categoryID").on(table.id),
	}
});

export const comments = mysqlTable("comments", {
	id: int("id").autoincrement().notNull(),
	userId: varchar("user_id", { length: 255 }),
	recipeId: varchar("recipe_id", { length: 255 }),
	text: text("text"),
	commentDate: timestamp("comment_date", { mode: 'string' }).defaultNow(),
},
(table) => {
	return {
		recipeIdIdx: index("recipe_id_idx").on(table.recipeId),
		userIdIdx: index("user_id_idx").on(table.userId),
		commentsId: primaryKey(table.id),
		commentId: unique("commentID").on(table.id),
	}
});

export const ingredients = mysqlTable("ingredients", {
	id: int("id").autoincrement().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	note: text("note"),
	amount: varchar("amount", { length: 255 }).notNull(),
	unit: varchar("unit", { length: 255 }).notNull(),
	recipeId: varchar("recipe_id", { length: 255 }).notNull(),
},
(table) => {
	return {
		nameIdx: index("name_idx").on(table.name),
		recipeIdIdx: index("recipe_id_idx").on(table.recipeId),
		ingredientsId: primaryKey(table.id),
		ingredientId: unique("ingredientID").on(table.id),
	}
});

export const likes = mysqlTable("likes", {
	id: int("id").autoincrement().notNull(),
	userId: varchar("user_id", { length: 255 }).notNull(),
	recipeId: varchar("recipe_id", { length: 255 }).notNull(),
	likeDate: timestamp("like_date", { mode: 'string' }).defaultNow(),
},
(table) => {
	return {
		recipeIdIdx: index("recipe_id_idx").on(table.recipeId),
		userIdIdx: index("user_id_idx").on(table.userId),
		likesId: primaryKey(table.id),
		likeId: unique("likeID").on(table.id),
	}
});

export const recipeCategories = mysqlTable("recipe_categories", {
	id: int("id").autoincrement().notNull(),
	recipeId: varchar("recipe_id", { length: 255 }).notNull(),
	categoryId: varchar("category_id", { length: 255 }).notNull(),
},
(table) => {
	return {
		recipeIdIdx: index("recipe_id_idx").on(table.recipeId),
		recipeCategoriesId: primaryKey(table.id),
		recipeCategoryId: unique("recipeCategoryID").on(table.id),
	}
});

export const recipes = mysqlTable("recipes", {
	id: int("id").autoincrement().notNull(),
	title: varchar("title", { length: 255 }).notNull(),
	description: text("description"),
	preparationTime: varchar("preparation_time", { length: 50 }),
	cookingTime: varchar("cooking_time", { length: 50 }),
	servings: int("servings"),
	difficultyLevel: varchar("difficulty_level", { length: 50 }),
	instructions: text("instructions"),
	creationDate: timestamp("creation_date", { mode: 'string' }).defaultNow(),
	authorId: varchar("author_id", { length: 255 }),
},
(table) => {
	return {
		recipesId: primaryKey(table.id),
	}
});

export const sessions = mysqlTable("sessions", {
	id: varchar("id", { length: 255 }).notNull(),
	sessionToken: varchar("sessionToken", { length: 255 }).notNull(),
	userId: varchar("userId", { length: 255 }).notNull(),
	expires: datetime("expires", { mode: 'string'}).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
(table) => {
	return {
		sessionsId: primaryKey(table.id),
		sessionsSessionTokenIdx: unique("sessions__sessionToken__idx").on(table.sessionToken),
	}
});

export const users = mysqlTable("users", {
	id: int("id").autoincrement().notNull(),
	username: varchar("username", { length: 255 }).notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	password: varchar("password", { length: 255 }).notNull(),
	profilePicture: varchar("profile_picture", { length: 255 }),
	registrationDate: timestamp("registration_date", { mode: 'string' }).defaultNow(),
},
(table) => {
	return {
		usernameIdx: index("username_idx").on(table.username),
		usersId: primaryKey(table.id),
		emailIdx: unique("email_idx").on(table.email),
		userId: unique("userID").on(table.id),
		usersEmailUnique: unique("users_email_unique").on(table.email),
		usersUsernameUnique: unique("users_username_unique").on(table.username),
	}
});

export const verificationTokens = mysqlTable("verification_tokens", {
	identifier: varchar("identifier", { length: 255 }).notNull(),
	token: varchar("token", { length: 255 }).notNull(),
	expires: datetime("expires", { mode: 'string'}).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
(table) => {
	return {
		verificationTokensId: primaryKey(table.id),
		verificationTokensTokenIdx: unique("verification_tokens__token__idx").on(table.token),
	}
});