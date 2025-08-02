import { useState, useEffect, useContext } from "react";
import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
const LoginPopUp = ({ setShowLogin }) => {
	const { url, setToken } = useContext(StoreContext);
	const [currState, setCurrState] = useState("Login");
	const [data, setdata] = useState({
		name: "",
		email: "",
		password: "",
	});
	const onChangeHandler = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setdata((data) => ({ ...data, [name]: value }));
	};

	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "auto";
		};
	}, []);
	const onlogin = async (event) => {
		event.preventDefault();
		let newUrl = url;
		if (currState === "Login") {
			newUrl += "/api/user/login";
		} else {
			newUrl += "/api/user/register";
		}
		console.log("API URL:", newUrl); // Debugging line
		const response = await axios.post(newUrl, data);
		if (response.data.success) {
			setToken(response.data.token);
			localStorage.setItem("token", response.data.token);
			setShowLogin(false);
		} else {
			alert(response.data.message);
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
			<div className="bg-white w-[90%] max-w-md px-8 py-6 rounded-2xl shadow-2xl animate-fadeIn">
				<div className="flex justify-between items-center border-b pb-3">
					<h2 className="text-2xl font-bold text-gray-800">
						{currState}
					</h2>
					<img
						src={assets.cross_icon}
						alt="close"
						className="w-6 cursor-pointer hover:scale-110 transition"
						onClick={() => setShowLogin(false)}
					/>
				</div>

				<div className="flex flex-col gap-4 mt-6">
					{currState === "Sign Up" && (
						<input
							type="text"
							name="name"
							onChange={onChangeHandler}
							value={data.name}
							placeholder="Your name"
							required
							className="border border-gray-300 focus:border-[#FF6347] focus:ring-2 focus:ring-[#FF6347]/30 p-3 rounded-lg outline-none transition duration-200"
						/>
					)}
					<input
						type="email"
						name="email"
						onChange={onChangeHandler}
						value={data.email}
						placeholder="Email"
						required
						className="border border-gray-300 focus:border-[#FF6347] focus:ring-2 focus:ring-[#FF6347]/30 p-3 rounded-lg outline-none transition duration-200"
					/>
					<input
						type="password"
						name="password"
						onChange={onChangeHandler}
						value={data.password}
						placeholder="Password"
						required
						className="border border-gray-300 focus:border-[#FF6347] focus:ring-2 focus:ring-[#FF6347]/30 p-3 rounded-lg outline-none transition duration-200"
					/>
				</div>

				<button
					onClick={onlogin}
					type="submit"
					className="w-full bg-[#FF6347] text-white text-lg font-semibold py-3 mt-6 rounded-lg hover:bg-[#FF4C3A] transition duration-300"
				>
					{currState === "Sign Up" ? "Create Account" : "Login"}
				</button>

				<div className="flex items-start gap-3 mt-4">
					<input
						type="checkbox"
						required
						className="mt-1 accent-[#FF6347]"
					/>
					<p className="text-sm text-gray-600">
						By continuing, I agree to the
						<span className="text-[#FF6347] font-medium cursor-pointer ml-1 hover:underline">
							Terms of Use & Privacy Policy
						</span>
					</p>
				</div>

				<p className="text-center mt-6 text-sm text-gray-700">
					{currState === "Login" ? (
						<>
							Don't have an account?{" "}
							<span
								onClick={() => setCurrState("Sign Up")}
								className="text-[#FF6347] font-medium cursor-pointer hover:underline"
							>
								Sign up here
							</span>
						</>
					) : (
						<>
							Already have an account?{" "}
							<span
								onClick={() => setCurrState("Login")}
								className="text-[#FF6347] font-medium cursor-pointer hover:underline"
							>
								Login here
							</span>
						</>
					)}
				</p>
			</div>
		</div>
	);
};

export default LoginPopUp;
