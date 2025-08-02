import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PlaceOrder from "./pages/PlaceOrder";
import Cart from "./pages/Cart";
import LoginPopUp from "./components/LoginPopUp";

function App() {
	const [showLogin, setShowLogin] = useState(false);

	return (
		<>
			{showLogin ? <LoginPopUp setShowLogin={setShowLogin} /> : <></>}
			<div>
				<Navbar setShowLogin={setShowLogin} />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/order" element={<PlaceOrder />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
