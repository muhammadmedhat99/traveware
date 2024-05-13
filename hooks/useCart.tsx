import { useContext } from "react";
import CartContext, { useCartContextType } from "@/context/cart-provider";

export const useCart = (): useCartContextType => {
  return useContext(CartContext);
};
