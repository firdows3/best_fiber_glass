import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Montserrat, Roboto } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
});

export const metadata = {
  title: "Best Fiber Glass",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${roboto.variable}`}>
        {/* <body> */}
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
