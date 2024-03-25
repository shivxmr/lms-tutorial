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
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
