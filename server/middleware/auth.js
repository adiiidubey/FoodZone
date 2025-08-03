import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
	try {
		// Extract token from Authorization header (format: Bearer <token>)
		const authHeader = req.headers.authorization;
		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res.status(401).json({
				success: false,
				message: "Not authorized. Please log in again",
			});
		}

		// Extract token value
		const token = authHeader.split(" ")[1];

		// Verify token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Attach user ID to request object (not request body)
		req.userId = decoded.id;

		// Proceed to next middleware or route handler
		next();
	} catch (error) {
		console.error("Auth Middleware Error:", error.message);
		return res.status(401).json({
			success: false,
			message: "Invalid or expired token. Please log in again.",
		});
	}
};
export default authMiddleware;
