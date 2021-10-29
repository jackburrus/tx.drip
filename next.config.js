/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	experimental: {
		esmExternals: false,
	},
	typescript: { ignoreBuildErrors: true },
};
