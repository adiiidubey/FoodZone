import { assets } from "../assets/assets";

const Header = () => {

	return (
		<div
			className="relative w-full h-[60vh] md:h-[80vh] bg-no-repeat bg-cover bg-center"
			style={{ backgroundImage: `url(${assets.header_img})` }}
		></div>
	);
};

export default Header;
