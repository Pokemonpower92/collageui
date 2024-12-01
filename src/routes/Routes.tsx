import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";

const Root = () => {
  return (
    <div className="min-h-screen">
      <nav className="bg-slate-800 text-white p-4">
        <div className="container mx-auto flex gap-4">
          <Link to="/" className="hover:text-blue-300">
            Home
          </Link>
          <Link to="/imagesets" className="hover:text-blue-300">
            ImageSet
          </Link>
        </div>
      </nav>

      <main className="container mx-auto p-4">
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

const Home = lazy(() => import("../pages/Home"));
const ImageSet = lazy(() => import("../pages/ImageSet"));
const NotFound = lazy(() => import("../pages/NotFound"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/imagesets",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <ImageSet />,
      },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
