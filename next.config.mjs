/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [
        'allroundclub.com',
        'www.denofgeek.com',
        'static.wikia.nocookie.net',
        'gift-test.s3.amazonaws.com',
      ],
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    experimental: {
      appDir: true,
      missingSuspenseWithCSRBailout: false,
    },
    reactStrictMode: true,
  };
  
 export default nextConfig;
  