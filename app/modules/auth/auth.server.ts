import { Authenticator } from "remix-auth";
import { User } from "../user/sql";
import { TOTPStrategy } from "remix-auth-totp";
import { sendAuthEmail } from "../email/email.server";
import { byEmail, createUser } from "../user";
import { sessionStorage } from "./auth-session.server";
import { redirect } from "@remix-run/node";

export let authenticator = new Authenticator<User>(sessionStorage, {
	throwOnError: true,
});

authenticator.use(
	new TOTPStrategy(
		{
			magicLinkPath: "/auth/magic-link",
			secret: process.env.ENCRYPTION_SECRET!,
			sendTOTP: async ({ email, code, magicLink }) => {
				console.log("[Dev-Only] TOTP Code: ", code);
				await sendAuthEmail({ email, code, magicLink });
			},
		},
		async ({ email }) => {
			let [user] = await byEmail(email);

			if (!user) {
				user = await createUser(email);
				if (!user) throw new Error("Unable to create User");
			}
			return user;
		},
	),
	"TOTP",
);

export async function requireUser(
	req: Request,
	{ redirectTo }: { redirectTo?: string | null } = {},
) {
	const user = await authenticator.isAuthenticated(req);
	if (!user) {
		if (!redirectTo) throw redirect("/auth/logout");
		throw redirect(redirectTo);
	}
	return user;
}
