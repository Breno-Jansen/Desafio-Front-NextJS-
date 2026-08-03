
/** @type {import('next').NextStep} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.tvmaze.com',
      },
    ],
  },
};

module.exports = nextConfig;