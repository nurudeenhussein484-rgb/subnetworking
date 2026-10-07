import "./globals.css";
import { Manrope } from "next/font/google";
const inter = Manrope({ subsets: ["latin"], variable: "--font-sans" });
const title = "Subnetworking by Rofiat Subuola | Engineering & Technology Solutions";
const description = "Subnetworking provides engineering, technology and networking solutions in Ilorin, Kwara State, Nigeria.";
export const metadata = {
  title, description,
  openGraph: { title, description, type: "website", locale: "en_NG", siteName: "Subnetworking" },
  twitter: { card: "summary_large_image", title, description },
};
export default function RootLayout({ children }) {
  return (<html lang="en" className={inter.variable}><body className="font-sans">{children}</body></html>);
}
