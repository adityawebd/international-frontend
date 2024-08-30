import 'bootstrap/dist/css/bootstrap.css'
import { Inter } from "next/font/google";
import "./globals.css";
import { CurrencyProvider } from '../app/CurrencyContext'; // Adjust the path as needed
import AuthProvider from '../components/Provider';


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "International Gift",
  description: "We International Gift, located at Uttam Nager, New Delhi. Have formed with the intention of expanding the market for new forms of art paintings, home decor, statues and sculptures that are produced cost-effectively to all our clientele. We have teamed up with the leading artists having a steep inclination in art to do our best & serve eye-warming art masterpieces to our valued customers spread throughout the world. Our customers' growing faith and confidence in us is our most valued possession.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body suppressContentEditableWarning
        suppressHydrationWarning
        className={inter.className}
      >
        <CurrencyProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </CurrencyProvider>


      </body>
    </html>
  );
}
