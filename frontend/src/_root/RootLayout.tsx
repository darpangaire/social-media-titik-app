import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "@/lib/react-query/authUtils";
import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Bottombar from "@/components/shared/Bottombar";

const RootLayout = () => {
  const auth = isAuthenticated();

  if (!auth) return <Navigate to="/sign-in" replace />;

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      {/* Topbar */}
      <Topbar />

      {/* Main container */}
      <div className="flex-1 flex w-full">
        
        {/* Sidebar - hidden on mobile, visible on md+ */}
        <aside className="hidden md:flex w-64 border-r bg-white">
          <LeftSidebar />
        </aside>

        {/* Main content area */}
        <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">
          {/* pb-20 prevents bottombar overlap on mobile */}
          <Outlet />
        </main>
      </div>

      {/* Bottom bar for mobile */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t z-50">
        <Bottombar />
      </div>
    </div>
  );
};

export default RootLayout;


