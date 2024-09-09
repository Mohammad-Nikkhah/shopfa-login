import { createBrowserRouter } from "react-router-dom";
import Login, { loginAction } from "./features/identity/components/login";
import Register, {
  registerAction,
} from "./features/identity/components/register";
import IdentityLayout from "./layouts/identity-layout";
import MainLayout from "./layouts/main-layout";
const router: any = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
  },
  {
    element: <IdentityLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "/register",
        element: <Register />,
        action: registerAction,
      },
    ],
  },
]);

export default router;
