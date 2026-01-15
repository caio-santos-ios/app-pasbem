import { Outfit } from 'next/font/google';
import './globals.css';
import "flatpickr/dist/flatpickr.css";
import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Autorization } from '@/components/autorization/Autorization';
import { Loading } from '@/components/loading/Loading';
import { Bounce, ToastContainer } from 'react-toastify';

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata = {
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
