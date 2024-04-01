import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { createYoga } from "graphql-yoga";
import { schema } from "./graphql/schema";
import cookie from "@fastify/cookie";
import { Context } from "./graphql/builder";
import cors from "@fastify/cors";
import { lucia } from "./auth";
import { Session, User } from "lucia";

const app = fastify({
	logger: {
		transport: {
			target: "pino-pretty",
		},
	},
});

app.register(cors, {
	origin: ["*"],
	methods: "*",
});

app.register(cookie, {
	secret: "secret",
});

const yoga = createYoga<{
	req: FastifyRequest;
	reply: FastifyReply;
	Context: Context;
}>({
	context: async ({ req, reply, Context }) => {
		const sessionId = lucia.readSessionCookie(req.cookies.memo ?? "");
		if (!sessionId) {
			return Context;
		}

		const { session, user } = await lucia.validateSession(sessionId);
		if (session && session.fresh) {
			reply.setCookie("memo", lucia.createSessionCookie(sessionId).serialize());
		}
		if (!session) {
			reply.setCookie("memo", lucia.createBlankSessionCookie().serialize());
		}

		return {
			user,
			session,
		};
	},
	schema,
	logging: {
		debug: (...args) => args.forEach((arg) => app.log.debug(arg)),
		info: (...args) => args.forEach((arg) => app.log.info(arg)),
		warn: (...args) => args.forEach((arg) => app.log.warn(arg)),
		error: (...args) => args.forEach((arg) => app.log.error(arg)),
	},
});

app.route({
	url: yoga.graphqlEndpoint,
	method: ["GET", "POST", "OPTIONS"],
	handler: async (req, reply) => {
		const response = await yoga.handleNodeRequestAndResponse(req, reply, {
			req,
			reply,
		});
		response.headers.forEach((value, key) => {
			reply.header(key, value);
		});

		reply.status(response.status);

		reply.send(response.body);

		return reply;
	},
});

declare global {
	namespace fastify {
		interface FastifyRequest {
			user: User | null;
			session: Session | null;
		}
	}
}

app.listen({ port: 4000 });
