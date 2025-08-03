import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import validator from "validator";

const createToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "2h" });
};

// Login
const loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await userModel.findOne({ email: email.toLowerCase() });
		if (!user) {
			return res
				.status(404)
				.json({ success: false, message: "User doesn't exist" });
		}
		const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			return res
				.status(401)
				.json({ success: false, message: "Invalid credentials" });
		}
		const token = createToken(user._id);
		res.status(200).json({ success: true, token });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

// Register
const registerUser = async (req, res) => {
	const { name, email, password } = req.body;
	try {
		const exists = await userModel.findOne({ email: email.toLowerCase() });
		if (exists) {
			return res
				.status(409)
				.json({ success: false, message: "User already exists" });
		}
		if (!validator.isEmail(email)) {
			return res
				.status(400)
				.json({ success: false, message: "Invalid email" });
		}
		if (password.length < 8) {
			return res
				.status(400)
				.json({ success: false, message: "Password too weak" });
		}
		const newUser = await new userModel({
			name,
			email: email.toLowerCase(),
			password,
		}).save();

		const token = createToken(newUser._id);
		res.status(201).json({ success: true, token });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

export { loginUser, registerUser };
