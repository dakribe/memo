import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { createYoga } from "graphql-yoga";
import { schema } from "./graphql/schema";

const app = fastify({ logger: true });

const yoga = createYoga<{
	req: FastifyRequest;
	reply: FastifyReply;
}>({
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

app.listen({ port: 4000 });
