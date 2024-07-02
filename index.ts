import { db } from "./db/client";
import { todos, users } from "./db/schema";
import invariant from "tiny-invariant";
import { randTextRange } from "@ngneat/falso";

// Create the user
console.log("Creating user...");
const [createdUser] = await db
	.insert(users)
	.values({ username: "trugamr" })
	.returning()
	.onConflictDoNothing();

if (createdUser) {
	console.log(`User ${createdUser.username} created!`);
} else {
	console.log("User already exists!");
}

// Create a random todo for user
const user = await db.query.users.findFirst();
invariant(user, "user should exist");

console.log(`Creating todo for user ${user.username}...`);
const [createdTodo] = await db
	.insert(todos)
	.values({
		userId: user.id,
		title: randTextRange({ min: 12, max: 64 }),
	})
	.returning();

console.log(`Todo created with id ${createdTodo.id}!`);

// List users with all their todos
console.log("Listing users with todos...");
const usersWithTodos = await db.query.users.findMany({
	with: {
		todos: true,
	},
});

console.dir(usersWithTodos, { depth: null });
