import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import {
	commitSession,
	sessionStorage,
} from "~/modules/auth/auth-session.server";
import { authenticator } from "~/modules/auth/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
	await authenticator.isAuthenticated(request, {
		successRedirect: "/home",
	});

	const cookie = await sessionStorage.getSession(request.headers.get("cookie"));
	const authEmail = cookie.get("auth:email");
	const authError = cookie.get(authenticator.sessionErrorKey);

	return Response.json(
		{ authEmail, authError },
		{
			headers: {
				"set-cookie": await commitSession(cookie),
			},
		},
	);
}

export async function action({ request }: ActionFunctionArgs) {
	const url = new URL(request.url);
	const currentPath = url.pathname;
	console.log("ACTION");

	await authenticator.authenticate("TOTP", request, {
		successRedirect: "/auth/verify",
		throwOnError: true,
		failureRedirect: currentPath,
	});
}

export default function Login() {
	const { authEmail } = useLoaderData<typeof loader>();

	return (
		<div>
			<p>Login</p>
			<Form method="POST" autoComplete="off">
				<input
					type="email"
					name="email"
					defaultValue={authEmail ? authEmail : ""}
					placeholder="john@email.com"
					required
				/>
				<button type="submit">Continue with Email</button>
			</Form>
		</div>
	);
}
