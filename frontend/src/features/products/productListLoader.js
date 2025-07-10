import api from "../../axiosConfig";

export default async function productListLoader() {
	try {
		const res = await api.get("http://127.0.0.1:5000/api/products");
		return { data: res.data, error: null }
	} catch(error) {
		return { data: null, error };
	};
};
