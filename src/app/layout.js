
import "./globals.css";
import {Inter} from 'next/font/google'

const inter = Inter ({subsets:['latin']})
export const metadata = {
  title: "Coffee House | قهوه و نوشیدنی‌های خاص",
  description:
    "خرید و تجربه قهوه‌های منتخب، نوشیدنی‌های خاص و محصولات تازه با کیفیت بالا.",
    icons:{
      icon:'./favicon.png'
    }
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" >
      <body className={inter.className}>{children}</body>
    </html>
  );
}
