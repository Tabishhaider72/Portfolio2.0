import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig & { turbopack?: { root?: string } } = {
    images: {
        unoptimized: true,
    },
    turbopack: {
        root: path.resolve(__dirname),
    },
};

export default nextConfig;
