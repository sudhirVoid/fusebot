import { Login, Register } from "../components/index";
import { BotStudio, ContentLibrary, HomePage, LandingPage } from "../pages";

export const routesConfig = [
    { path: "/", element: LandingPage , isProtected: false },
    { path: "/login", element: Login, isProtected: false },
    { path: "/register", element: Register, isProtected: false },
    { path: "/home", element: HomePage, isProtected: true },
    { path: "/studio", element: BotStudio, isProtected: true },
    { path: "/library", element: ContentLibrary, isProtected: true },

  ];
  