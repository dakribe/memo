import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";
import { Lucia } from "lucia";

const client = new PrismaClient();

const adapter = new PrismaAdapter(client.session, client.user);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {},
	},
	getUserAttributes: (attributes) => {
		return {
			userId: attributes.userId,
			username: attributes.username,
		};
	},
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: {
			userId: string;
			username: string;
		};
	}
}
