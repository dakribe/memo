import { lucia } from "../../auth";
import { db } from "../../db";
import { builder } from "../builder";
import { Argon2id } from "oslo/password";

builder.prismaObject("User", {
	fields: (t) => ({
		id: t.exposeID("id"),
		username: t.exposeString("username"),
		hashedPassword: t.exposeString("hashed_password"),
		sessions: t.relation("sessions"),
	}),
});

builder.prismaObject("Session", {
	fields: (t) => ({
		id: t.exposeID("id"),
		userId: t.exposeString("userId"),
		expiresAt: t.expose("expiresAt", { type: "DateTime" }),
		user: t.relation("user"),
	}),
});

const AuthInput = builder.inputType("AuthInput", {
	fields: (t) => ({
		username: t.string({ required: true }),
		password: t.string({ required: true }),
	}),
});

builder.mutationField("registerUser", (t) =>
	t.prismaField({
		type: "User",
		args: {
			input: t.arg({ type: AuthInput, required: true }),
		},
		resolve: async (_, __, { input }, context) => {
			const { username, password } = input;

			const userExists = await db.user.findUnique({
				where: {
					username,
				},
			});

			if (userExists) {
				throw new Error("Username already exists");
			}

			const hashedPassword = await new Argon2id().hash(password);

			const user = await db.user.create({
				data: {
					username: input.username,
					hashed_password: hashedPassword,
				},
			});

			const session = await lucia.createSession(user.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);

			context.reply.setCookie("memo-cookie", sessionCookie.serialize());

			return user;
		},
	}),
);

builder.queryField("users", (t) =>
	t.prismaField({
		type: ["User"],
		resolve: async () => {
			return db.user.findMany();
		},
	}),
);
