import { relations } from "drizzle-orm";
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
	id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
	username: text("username", { length: 64 }).unique().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
	todos: many(todos),
}));

export const todos = sqliteTable("todos", {
	id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
	title: text("title", { length: 128 }).notNull(),
	userId: integer("user_id", { mode: "number" })
		.notNull()
		.references(() => users.id),
});

export const todosRelations = relations(todos, ({ one }) => ({
	user: one(users, { fields: [todos.userId], references: [users.id] }),
}));
