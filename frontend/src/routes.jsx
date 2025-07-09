// Auth checks
import preFetchAuth from "./auth/preFetchAuth";
import checkUserAuth from "./auth/checkUserAuth";

import ProtectedRoute from "./components/ProtectedRoute";
import ErrorPage from "./components/ErrorPage";
// import ErrorPage from "../pages/ErrorPage";
import Login from "./features/login/Login";
// Product list feature
import ProductList from "./features/products/ProductList";
import productListLoader from "./features/products/productListLoader";
// Product details feature
import ProductDetails from "./features/products/ProductDetails";
// loader here

// ProtectedRoute component is for loading UI depending on user auth
// preFetchAuth stops loaders from executing needlesly if auth fails
// because loader fetches before the component is rendered

const routes = [
	{
		Component: ProtectedRoute,
		ErrorBoundary: ErrorPage,
		children: [
			{
				path: "/products",
				Component: ProductList,
				loader: preFetchAuth(productListLoader),
			},
			{
				path: "/products/:id",
				Component: ProductDetails,
				// loader: preFetchAuth(productDetailsLoader),
			},
		]
	},
	{
		path: "/login",
		Component: Login,
		loader: checkUserAuth,
		ErrorBoundary: ErrorPage,
	},
];

export default routes;
