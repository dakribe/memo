import { data, LoaderFunctionArgs } from "@remix-run/node";
import {
	isRouteErrorResponse,
	MetaFunction,
	useLoaderData,
	useRouteError,
} from "@remix-run/react";
import { Profile } from "~/modules/profile";

export const meta: MetaFunction = () => {
	return [{ title: "Profile / Memo" }];
};

export async function loader({ params }: LoaderFunctionArgs) {
	const profile = await Profile.byUsername(params.username!);
	if (!profile) {
		throw new Response("Not found", { status: 401 });
	}
	return data({
		profile,
	});
}

export default function UserProfile() {
	const { profile } = useLoaderData<typeof loader>();
	return <div>Profile for: {profile.username}</div>;
}

export function ErrorBoundary() {
	const error = useRouteError();

	if (isRouteErrorResponse(error)) {
		return <div>This account doesn't exist</div>;
	}

	return <div>Error</div>;
}
