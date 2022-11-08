// react
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

// redux
import { useSelector } from "react-redux";

// pages
import App from "./App";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Room from "./pages/Room/Room";

function Router() {
  const { userName } = useSelector((state) => state.user);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "",
          element: <Dashboard />,
          loader: () => {
            if (!userName) throw redirect("/login");
          },
        },
        {
          path: "rooms/:room",
          element: <Room />,
          loader: () => {
            if (!userName) throw redirect("/login");
          },
        },
        {
          path: "login",
          element: <Login />,
          loader: () => {
            if (userName) throw redirect("/");
          },
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
