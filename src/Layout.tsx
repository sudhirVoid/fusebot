import React from "react";
import { NavBar, Footer, Sidebar } from "./components";
import { Outlet, useLocation } from "react-router-dom";
import { routesConfig } from "./routes/routesConfig";

export default function Layout() {
  const location = useLocation();
  const routeConfig = routesConfig.find(route => location.pathname === route.path);
  const isProtectedRoute = routeConfig?.isProtected;

  return (
    <div className={`flex ${isProtectedRoute ? 'min-h-screen' : 'flex-col min-h-screen'}`}>
      {isProtectedRoute ? (
        <div className="flex justify-center items-center" >
          <Sidebar />
          <main className="flex-1 ml-8 p-4 h-screen overflow-auto no-scrollbar"> {/* Adjust ml-64 based on Sidebar width */}
            <Outlet />
          </main>
        </div>
      ) : (
        <div className="flex flex-col flex-1">
          <NavBar />
          <main className="flex-1 p-4 ">
            <Outlet />
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
}
