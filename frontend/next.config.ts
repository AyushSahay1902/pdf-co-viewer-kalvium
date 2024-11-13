import type { NextConfig } from "next";

// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false, // This forces Next.js to use Webpack instead of Turbopack
  },
};

module.exports = nextConfig;
