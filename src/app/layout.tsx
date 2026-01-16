import { Outfit } from 'next/font/google';
import './globals.css';
import "flatpickr/dist/flatpickr.css";
import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Autorization } from '@/components/autorization/Autorization';
import { Loading } from '@/components/loading/Loading';
import { Bounce, ToastContainer } from 'react-toastify';
import { Metadata, Viewport } from 'next';

const outfit = Outfit({
  subsets: ["latin"],
});
// 1. O Objeto Viewport é CRUCIAL para remover a barra branca no Android e iOS
export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover", // Garante que o app use toda a tela (especialmente em iPhones com notch)
};

export const metadata: Metadata = {
  title: "PasBem",
  description: "Seu app de saúde",
  manifest: "/aplicativo/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PasBem",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-Br">
      <head>
        {/* Força o modo standalone em navegadores mobile legados */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <ThemeProvider>
          {/* <Autorization /> */}
          <Loading />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce}
            />
          <SidebarProvider>{children}</SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
