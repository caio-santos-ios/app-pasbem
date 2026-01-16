import withPWAInit from "@ducanh2912/next-pwa";
import { NextConfig } from "next";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
    // Aumenta o limite para 10MB para suportar os arquivos do template TailAdmin
    maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, 
  },
});

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  basePath: '/aplicativo',
  // Se você tiver problemas com CSS/Imagens no subdiretório, descomente a linha abaixo:
  // assetPrefix: '/aplicativo/', 
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
    
    turbopack: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
};

export default withPWA(nextConfig);