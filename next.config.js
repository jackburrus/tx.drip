/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	experimental: {
		esmExternals: false,
	},
	typescript: { ignoreBuildErrors: true },
	env: {
		ALCHEMY_MAINNET: process.env.ALCHEMY_MAINNET,
	},
};
