/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['allroundclub.com', 'www.denofgeek.com', 'www.denofgeek.com', 'static.wikia.nocookie.net', 'static.wikia.nocookie.net','gift-test.s3.amazonaws.com'],
    },
    eslint: {
        ignoreDuringBuilds: true,
      },
};

export default nextConfig;
