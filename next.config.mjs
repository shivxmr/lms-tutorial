/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
			"images.unsplash.com",
			"www.google.com",
			"plus.unsplash.com",
			"unsplash.com",
			"media.istockphoto.com",
			"www.pexels.com",
			"images.pexels.com",
		],
	},
	webpack: (config) => {
		config.resolve.alias.canvas = false;
		return config;
	},
};

export default nextConfig;
