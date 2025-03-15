import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Navbar } from "../components/navbar/Navbar";

const Root = () => {
	return (
		<div className="min-h-screen">
			<Navbar />
			<main className="container mx-auto p-4">
				<Suspense fallback={<div>Loading...</div>}>
					<Outlet />
				</Suspense>
			</main>
		</div>
	);
};

const HomePage = lazy(() => import("../pages/HomePage"));
const ImageSetPage = lazy(() => import("../pages/ImageSetPage"));
const CollagePage = lazy(() => import("../pages/CollagePage"));
const CreateCollagePage = lazy(() => import("../pages/CreateCollagePage"));
const NotFound = lazy(() => import("../pages/NotFound"));

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <NotFound />,
		children: [
			{
				index: true,
				element: <HomePage />,
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
				element: <ImageSetPage />,
			},
		],
	},
	{
		path: "/collages",
		element: <Root />,
		errorElement: <NotFound />,
		children: [
			{
				index: true,
				element: <CollagePage />,
			},
		],
	},
	{
		path: "/createcollage",
		element: <Root />,
		errorElement: <NotFound />,
		children: [
			{
				index: true,
				element: <CreateCollagePage />,
			},
		],
	},
]);

export function Routes() {
	return <RouterProvider router={router} />;
}
