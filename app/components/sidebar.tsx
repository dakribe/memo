import { Link } from "@remix-run/react";
import {
	Home,
	Search,
	Bell,
	Mail,
	Bookmark,
	User as UserIcon,
	Settings,
	LucideIcon,
} from "lucide-react";
import { User } from "~/modules/user/sql";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface SidebarItem {
	label: string;
	url: string | ((user: User) => string);
	icon: LucideIcon;
}

const sidebarItems: SidebarItem[] = [
	{
		label: "Home",
		url: "/home",
		icon: Home,
	},
	{
		label: "Explore",
		url: "/explore",
		icon: Search,
	},
	{
		label: "Notifications",
		url: "/notifications",
		icon: Bell,
	},
	{
		label: "Messages",
		url: "/messages",
		icon: Mail,
	},
	{
		label: "Bookmarks",
		url: "/bookmarks",
		icon: Bookmark,
	},
	{
		label: "Profile",
		url: (user: User) => `/${user.username}`,
		icon: UserIcon,
	},
	{
		label: "Settings",
		url: "/settings",
		icon: Settings,
	},
];

interface SidebarProps {
	user: User;
}

export function Sidebar({ user }: SidebarProps) {
	const items = sidebarItems.map((item) => ({
		...item,
		url: typeof item.url === "function" ? item.url(user) : item.url,
	}));

	return (
		<div className="h-screen w-64 p-4 border-r border-gray-200 flex flex-col justify-between">
			<div>
				<div className="mb-4">
					<Link to="/home" className="text-2xl font-bold">
						Memo
					</Link>
				</div>
				<ul className="space-y-2">
					{items.map((item) => (
						<li key={item.label}>
							<Link
								to={item.url}
								className="flex gap-4 items-center py-2 rounded-full"
							>
								{item.icon && <item.icon className="w-6 h-6" />}
								<span className="text-lg">{item.label}</span>
							</Link>
						</li>
					))}
				</ul>
			</div>

			<div className="mt-8 flex items-center gap-3">
				<Avatar>
					<AvatarFallback>{user.username?.slice(0, 1)}</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-semibold">{user.username}</p>
					<p className="text-sm text-gray-500">@{user.username}</p>
				</div>
			</div>
		</div>
	);
}
