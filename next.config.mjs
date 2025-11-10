/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true
	},
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: 'i.dummyjson.com' },
			{ protocol: 'https', hostname: 'cdn.dummyjson.com' }
		]
	}
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		typedRoutes: true
	},
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: 'i.dummyjson.com' },
			{ protocol: 'https', hostname: 'cdn.dummyjson.com' }
		]
	}
};

export default nextConfig;

