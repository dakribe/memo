import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUser } from "~/modules/auth/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
	const user = await requireUser(request, { redirectTo: "/auth/login" });
	return { user };
}

export default function Home() {
	const { user } = useLoaderData<typeof loader>();
	return (
		<div>
			<p>{user.email}</p>
		</div>
	);
}
