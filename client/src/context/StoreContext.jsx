import { createContext, useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
	const [food_list, setFoodList] = useState([]);
	const url =
		import.meta.env.VITE_API_URL ||
		"https://tomato-a-food-delivery-website.onrender.com";

	const [token, setToken] = useState("");
	const [cartItems, setCartItems] = useState({});
	const navigate = useNavigate();
	const addToCart = async (itemId) => {
		if (!cartItems[itemId]) {
			setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
		} else {
			setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
		}
		if (token) {
			await axios.post(
				`${url}/api/cart/add`,
				{ itemId },
				{
					headers: { token }, // ✅ Send token as expected by backend
				}
			);
		}
	};
	const removeFromCart = async (itemId) => {
		setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
		if (token) {
			await axios.post(
				`${url}/api/cart/remove`,
				{ itemId },
				{
					headers: { token }, // ✅ Send token as expected by backend
				}
			);
		}
	};
	const loadCartData = async (token) => {
		const response = await axios.post(
			`${url}/api/cart/get`,
			{},
			{
				headers: { token },
			}
		);
		setCartItems(response.data.cartData);
	};
	const fetchFoodList = async () => {
		const response = await axios.get(url + "/api/food/list");
		console.log(response.data.data);
		setFoodList(response.data.data);
	};

	useEffect(() => {
		async function loadData() {
			await fetchFoodList();

			if (localStorage.getItem("token")) {
				setToken(localStorage.getItem("token"));
				await loadCartData(localStorage.getItem("token"));
			} else {
				setCartItems({});
			}
		}
		loadData();
	}, [token]);

	const getTotalCartAmount = () => {
		let totalAmount = 0;
		for (const item in cartItems) {
			if (cartItems[item] > 0) {
				let itemInfo = food_list.find(
					(product) => product._id === item
				);
				totalAmount += itemInfo.price * cartItems[item];
			}
		}
		return totalAmount;
	};

	const contextValue = {
		token,
		setToken,
		url,
		food_list,
		cartItems,
		setCartItems,
		addToCart,
		removeFromCart,
		navigate,
		getTotalCartAmount,
	};
	return (
		<StoreContext.Provider value={contextValue}>
			{props.children}
		</StoreContext.Provider>
	);
};
export default StoreContextProvider;
