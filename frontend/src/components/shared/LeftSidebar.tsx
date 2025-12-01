import {
  Home,
  Users,
  Compass,
  Bookmark,
  PlusCircle,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useProfile } from "@/lib/react-query/useProfile";

const LeftSidebar = () => {
  const collapsed = false;
  const location = useLocation();
  const { data: profile, isLoading } = useProfile();

  const items = [
    { title: "Home", icon: Home, path: "/" },
    { title: "Explore", icon: Compass, path: "/explore" },
    { title: "People", icon: Users, path: "/people" },
    { title: "Saved", icon: Bookmark, path: "/saved" },
    { title: "Create Post", icon: PlusCircle, path: "/create-post" },
  ];

  return (
    <aside
      className={cn(
        "h-screen border-r bg-white transition-all p-3 flex flex-col",
        collapsed ? "w-20" : "w-64"
      )}
    >

      {/* ---- PROFILE BOX ---- */}
      <Link
        to="/profile"
        className={cn(
          "flex items-center gap-3 p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition",
          collapsed && "justify-center"
        )}
      >
        {/* Profile Picture */}
        <img
          src={profile?.profile_picture || "/assets/images/profile.png"}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover border"
        />

        {/* Username */}
        {!collapsed && (
          <div className="flex flex-col">
            <span className="font-semibold">
              {isLoading ? "Loading..." : profile?.name}
            </span>
            <span className="text-sm text-gray-500">@{profile?.username}</span>
          </div>
        )}
      </Link>

      <div className="my-4 border-b"></div>

      {/* ---- MENU ITEMS ---- */}
      <nav className="flex flex-col gap-1">
        {items.map((item, i) => {
          const active = location.pathname === item.path;

          return (
            <Link
              to={item.path}
              key={i}
              className={cn(
                "flex items-center gap-3 p-2 rounded-xl hover:bg-primary-100 transition-all",
                active && "bg-sky-700 text-white font-semibold",
                collapsed && "justify-center"
              )}
            >
              <item.icon size={22} />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default LeftSidebar;
