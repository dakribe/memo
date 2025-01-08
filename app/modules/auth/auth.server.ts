import { Authenticator } from "remix-auth";
import { User } from "../user/sql";
import { TOTPStrategy } from "remix-auth-totp";
import { sendAuthEmail } from "../email/email.server";
import { byEmail, createUser } from "../user";
import { sessionStorage } from "./auth-session.server";

export let authenticator = new Authenticator<User>(sessionStorage, {
	throwOnError: true,
});

authenticator.use(
	new TOTPStrategy(
		{
			secret: "secret",
			magicLinkPath: "/magic-link",
			sendTOTP: async ({ email, code, magicLink }) => {
				console.log("SEND TOTP");
				if (process.env.NODE_ENV === "development") {
					console.log("[Dev-Only] TOTP Code: ", code);
				}
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
