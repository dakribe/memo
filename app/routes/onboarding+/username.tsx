import {
	ActionFunctionArgs,
	LoaderFunctionArgs,
	redirect,
} from "@remix-run/node";
import { parseWithZod } from "@conform-to/zod";
import { useActionData } from "@remix-run/react";
import { z } from "zod";
import { requireUser } from "~/modules/auth/auth.server";
import { useForm } from "@conform-to/react";
import { update } from "~/modules/user";
import {
	commitSession,
	sessionStorage,
} from "~/modules/auth/auth-session.server";
import { Profile } from "~/modules/profile";
import { Form } from "node_modules/@conform-to/react/context";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

export async function loader({ request }: LoaderFunctionArgs) {
	const user = await requireUser(request, { redirectTo: "/auth/login" });
	if (user.username) {
		throw redirect("/home");
	}
	return user;
}

const schema = z.object({
	username: z.string().min(3).max(15),
});

export async function action({ request }: ActionFunctionArgs) {
	const user = await requireUser(request, { redirectTo: "/auth/login" });

	const formData = await request.formData();
	const submission = parseWithZod(formData, { schema });
	if (submission.status !== "success") {
		return submission.reply();
	}

	const { username } = submission.value;
	const [newUser] = await update(username, user.id);

	const session = await sessionStorage.getSession(
		request.headers.get("cookie"),
	);

	session.set("user", newUser);

	await Profile.create(user.id, newUser.username!);

	return redirect("/home", {
		headers: {
			"Set-Cookie": await commitSession(session),
		},
	});
}

export default function Onboarding() {
	const lastResult = useActionData<typeof action>();

	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema });
		},
	});
	return (
		<div>
			<div className="mx-auto flex h-screen w-screen max-w-7xl flex-col px-6">
				<div className="mx-auto flex h-full w-full max-w-[350px] flex-col items-center justify-center gap-6">
					<div className="flex w-full flex-col items-center gap-6">
						<div className="flex w-full flex-col items-center justify-center gap-2">
							<div className="flex flex-col items-center gap-1">
								<h1 className="text-center text-2xl font-semibold tracking-tight">
									Welcome to Memo!
								</h1>
								<p className="text-center text-base font-normal text-gray-600">
									Please create a username for your account.
								</p>
							</div>
						</div>
						<form
							method="post"
							id={form.id}
							onSubmit={form.onSubmit}
							className="flex w-full flex-col gap-2"
							autoComplete="off"
						>
							<div className="flex flex-col gap-2">
								<Input
									type="text"
									name={fields.username.name}
									placeholder="@username"
								/>
								<div>{fields.username.errors}</div>
								<Button type="submit">Continue</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
