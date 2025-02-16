import type { Metadata } from "next";
import {Poppins} from "next/font/google";
import "./globals.css";
import NavBar from "./components/nav/NavBar";
import Footer from "./components/footer/Footer";
import CartProvider from "@/providers/CartProvider";
import { Toaster } from "react-hot-toast";


const poppins = Poppins ({
  weight: ['400','700'],
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "E-Shop",
  description: "Ecommerce App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en">
      <body
        className={`${poppins.className} text-slate-700`}>
          <Toaster toastOptions={{
            style:{
              background: 'rgb(51 65 65)',
              color: '#fff',
            }
          }} />
          <CartProvider>
              <div className="flex flex-col min-h-screen">
                  <NavBar/>
                    <main className="flex-grow">
                    {children}
                    </main>
                  <Footer/>
              </div>
        </CartProvider>
      </body>
    </html>
  );
}


