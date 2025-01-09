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
	await update(submission.value.username, user.id);
	return redirect("/home");
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
			<form method="post" id={form.id} onSubmit={form.onSubmit}>
				<input type="text" name={fields.username.name} />
				<div>{fields.username.errors}</div>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}
