import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import {
	ActionFunctionArgs,
	LoaderFunctionArgs,
	MetaFunction,
} from "@remix-run/node";
import { Form } from "@remix-run/react";
import { z } from "zod";
import { InputConform } from "~/components/conform/input";
import { Field, FieldError } from "~/components/field";
import { Button } from "~/components/ui/button";
import { requireUser } from "~/modules/auth/auth.server";
import { Memo } from "~/modules/memo";

export const meta: MetaFunction = () => {
	return [{ title: "Home / Memo" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
	const user = await requireUser(request, { redirectTo: "/auth/login" });
	return { user };
}

const CreateMemoSchema = z.object({
	message: z.string().min(1).max(120),
});

export async function action({ request }: ActionFunctionArgs) {
	const user = await requireUser(request);
	const formData = await request.formData();
	const submission = parseWithZod(formData, {
		schema: CreateMemoSchema,
	});

	if (submission.status !== "success") {
		return submission.reply();
	}

	const [memo] = await Memo.create({
		message: submission.value.message,
		userId: user.id,
	});

	return Response.json(memo);
}

export default function Home() {
	const [form, fields] = useForm({
		id: "CreateMemo",
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: CreateMemoSchema });
		},
	});
	return (
		<div>
			<div>
				<Form
					method="post"
					action="/home"
					id={form.id}
					onSubmit={form.onSubmit}
				>
					<Field>
						<InputConform meta={fields.message} type="text" />
						{fields.message.errors && (
							<FieldError>{fields.message.errors}</FieldError>
						)}
					</Field>
					<Button type="submit">Post</Button>
				</Form>
			</div>
		</div>
	);
}
