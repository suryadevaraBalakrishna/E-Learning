import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./common/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import Script from "next/script";
import Footer from "./common/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Mainlayout from "./Mainlayout";
import { ToastContainer } from "react-toastify";

const inter = Inter({
  weight: ["400", "500", "700"],
  display: "swap",
  subsets: ["latin"],
});



export const metadata = {
  title: "E-Learning Platform",
  description: "Online LMS Platform for learning and teaching",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <Mainlayout>
        <Header/>
        <ToastContainer/>
        {children}

        
        <Script
  src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
  strategy="afterInteractive"
/>
        <Footer/>
        </Mainlayout>
      </body>
    </html>
  );
}
