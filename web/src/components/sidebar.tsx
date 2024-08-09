import { Bell, House, Search } from "lucide-solid";
import { For, JSX } from "solid-js";

type Link = {
  label: string;
  icon: JSX.Element;
  href: string;
};

const links: Link[] = [
  {
    label: "Home",
    icon: <House size={24} />,
    href: "/home",
  },
  {
    label: "Explore",
    icon: <Search size={24} />,
    href: "/#",
  },

  {
    label: "Notifications",
    icon: <Bell size={24} />,
    href: "/#",
  },
];

export function Sidebar() {
  return (
    <div class="border-r width-[300px] p-2">
      <For each={links}>
        {(link) => (
          <a
            class="flex hover:bg-slate-500 rounded-lg px-2 py-1 items-center"
            href={link.href}
          >
            {link.icon}
            <p class="pl-2">{link.label}</p>
          </a>
        )}
      </For>
    </div>
  );
}
