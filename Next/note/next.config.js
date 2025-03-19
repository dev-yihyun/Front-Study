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
    async redirects() {
        // redirect 해줄 배열을 리턴한다.
        return [
            {
                source: "/products/delete_forever", // products/delete_forever 경로에 오면
                destination: "/products", // /products 경로에 오도록 할 것 이다.
                permanent: true, // 옮겨갔다.
            },
            {
                source: "/products/delete_temp",
                destination: "/products",
                permanent: false, // 일시적으로 페이지가 이동했다면
            },
        ];
    },
};

module.exports = nextConfig;
