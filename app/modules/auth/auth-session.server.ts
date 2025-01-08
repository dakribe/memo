import { createCookieSessionStorage } from "@remix-run/node";

export const sessionStorage = createCookieSessionStorage({
	cookie: {
		name: "auth",
		path: "/",
		sameSite: "lax",
		httpOnly: true,
		// TODO: Update secret
		secrets: ["secret"],
		secure: process.env.NODE_ENV === "production",
	},
});

export const { getSession, commitSession, destroySession } = sessionStorage;
