import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development", // Dica: desabilite em dev para não cachear tudo enquanto programa
  workboxOptions: {
    disableDevLogs: true,
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/aplicativo',
  // Se você tiver problemas com CSS/Imagens no subdiretório, descomente a linha abaixo:
  // assetPrefix: '/aplicativo/', 
};

export default withPWA(nextConfig);