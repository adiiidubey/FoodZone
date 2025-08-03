import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			minlength: 2,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match: [/\S+@\S+\.\S+/, "Invalid email format"],
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},

		// Reference to cart (one-to-one relationship)
		cartData: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Cart",
		},
	},
	{ timestamps: true }
);

// Pre-save hook to hash password only if modified
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
		next();
	} catch (err) {
		next(err);
	}
});

// Method to compare password
userSchema.methods.comparePassword = async function (userPassword) {
    return await bcrypt.compare (userPassword, this.password);
}

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
