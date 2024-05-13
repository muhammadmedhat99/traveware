import { CartProvider } from "@/context/cart-provider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Component {...pageProps} />
      <Toaster position="top-right" duration={1000} />
    </CartProvider>
  );
}
