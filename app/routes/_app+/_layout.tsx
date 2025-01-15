import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { Sidebar } from "~/components/sidebar";
import { requireUser } from "~/modules/auth/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
	const user = await requireUser(request);
	if (!user.username) {
		return redirect("/onboarding/username");
	}

	return { user };
}

export default function Layout() {
	const { user } = useLoaderData<typeof loader>();
	return (
		<div className="min-h-screen max-w-4xl mx-auto">
			<div className="flex justify-between">
				<Sidebar user={user} />
				<Outlet />
			</div>
		</div>
	);
}
