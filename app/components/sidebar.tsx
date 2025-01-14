import { Link } from "@remix-run/react";
import {
	Home,
	Search,
	Bell,
	Mail,
	Bookmark,
	User,
	Settings,
	LucideIcon,
} from "lucide-react";

interface SidebarItem {
	label: string;
	url: string;
	icon?: LucideIcon;
}

const items: SidebarItem[] = [
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
		url: "/profile",
		icon: User,
	},
	{
		label: "Settings",
		url: "/settings",
		icon: Settings,
	},
];

export function Sidebar() {
	return (
		<div className="h-screen w-64 p-4 border-r border-gray-200 flex flex-col">
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
	);
}
