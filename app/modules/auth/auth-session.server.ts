import { createCookieSessionStorage } from "@remix-run/node";

export const sessionStorage = createCookieSessionStorage({
	cookie: {
		name: "auth",
		path: "/",
		sameSite: "lax",
		httpOnly: true,
		secrets: [process.env.SESSION_SECRET!],
		secure: process.env.NODE_ENV === "production",
	},
});

export const { getSession, commitSession, destroySession } = sessionStorage;
