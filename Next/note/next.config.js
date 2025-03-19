/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true, // app 디렉토리 활성화
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
        ],
    },
};

module.exports = nextConfig;
