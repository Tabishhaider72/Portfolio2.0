import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    turbopack: {
        // force Turbopack to use this package root (prevents Next from inferring C:\Users\Sayed as root)
        root: './'
    }
};

export default nextConfig;
