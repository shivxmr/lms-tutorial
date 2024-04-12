/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["intel.com"],
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
	reactStrictMode: false,
};

export default nextConfig;
