import SchemaBuilder from "@pothos/core";
import { DateResolver } from "graphql-scalars";
import type PrismaTypes from "../../prisma/pothos-types";
import PrismaPlugin from "@pothos/plugin-prisma";
import { db } from "../db";
import { FastifyReply, FastifyRequest } from "fastify";
import { Session, User } from "lucia";

export interface Context {
	req: FastifyRequest;
	reply: FastifyReply;
	user: User | null;
	session: Session | null;
}

export const builder = new SchemaBuilder<{
	PrismaTypes: PrismaTypes;
	Context: Context;
	Scalars: {
		DateTime: {
			Output: Date;
			Input: Date;
		};
	};
}>({
	plugins: [PrismaPlugin],
	prisma: {
		client: db,
	},
});

builder.queryType();
builder.mutationType();

builder.addScalarType("DateTime", DateResolver);
