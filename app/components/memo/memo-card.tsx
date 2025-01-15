import { Heart } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";

interface MemoCardProps {
	message: string;
	timestamp?: Date;
	username: string;
}

export function MemoCard({ message, username }: MemoCardProps) {
	return (
		<div className="max-w-md mx-auto shadow-sm px-4 py-2 border-b border-gray-200 hover:bg-slate-900">
			{/* User Info */}
			<div className="flex items-center space-x-4">
				<Avatar>
					<AvatarFallback>{username?.slice(0, 1)}</AvatarFallback>
				</Avatar>
				<div>
					<div className="font-semibold text-foreground">{username}</div>
					<div className="text-sm text-muted-foreground">@{username}</div>
				</div>
			</div>

			{/* Tweet Content */}
			<div className="mt-4">
				<p className="text-foreground">{message}</p>
				{/* <div className="mt-2 text-sm text-muted-foreground">{timestamp}</div> */}
			</div>

			{/* Interaction Buttons */}
			<div className="mt-4 flex justify-between align-middle">
				<Button
					variant="ghost"
					className="text-muted-foreground hover:text-red-500"
				>
					<Heart className="h-4 w-4" />
					{/* <span>{likes}</span> */}
				</Button>
			</div>
		</div>
	);
}
