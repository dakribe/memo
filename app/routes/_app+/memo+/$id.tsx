import { data, LoaderFunctionArgs } from "@remix-run/node";
import {
	isRouteErrorResponse,
	useLoaderData,
	useRouteError,
} from "@remix-run/react";
import { MemoCard } from "~/components/memo/memo-card";
import { Memo } from "~/modules/memo";

export async function loader({ params }: LoaderFunctionArgs) {
	const memo = await Memo.getById(params.id!);
	if (!memo) {
		throw new Response("Not found", { status: 401 });
	}
	return data({
		memo,
	});
}

export default function MemoPage() {
	const { memo } = useLoaderData<typeof loader>();

	return <MemoCard username={memo.username} message={memo.message} />;
}

export function ErrorBoundary() {
	const error = useRouteError();

	if (isRouteErrorResponse(error)) {
		return <div>This memo doesn't exist</div>;
	}

	return <div>Error</div>;
}
