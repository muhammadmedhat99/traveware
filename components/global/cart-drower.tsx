import React from "react";
import { MinusIcon, PlusIcon, ShoppingCart, X } from "lucide-react";
import { useCart } from "@/hooks/useCart";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CartItemsType } from "@/context/cart-provider";
import { toast } from "sonner";

type CartDrowerProps = {};

export const CartDrower = ({}: CartDrowerProps) => {
  const { totalItems, totalPrice, cart, dispatch, REDUCER_ACTIONS } = useCart();

  const onIncreaseQty = (item: CartItemsType, qty: number) => {
    dispatch({
      type: REDUCER_ACTIONS.QUANTITY,
      payload: { ...item, qty },
    });

    toast.success("Quantity Increased");
  };

  const onDecreaseQty = (item: CartItemsType, qty: number) => {
    dispatch({
      type: REDUCER_ACTIONS.QUANTITY,
      payload: { ...item, qty },
    });

    toast.success("Quantity Decreased");
  };

  const onRemoveItem = (item: CartItemsType) => {
    dispatch({
      type: REDUCER_ACTIONS.REMOVE,
      payload: { ...item },
    });

    toast.success("Item Removed From Cart");
  };
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="default" className="w-12 h-12 p-0 relative">
          <span className="absolute -top-3 -right-3 w-5 h-5 bg-red-600 rounded-full text-white">
            {totalItems}
          </span>
          <ShoppingCart className="w-4 h-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-xs sm:max-w-xl">
          <div className="flex flex-col gap-2 my-5">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div
                  className="flex items-center justify-between"
                  key={item.id}
                >
                  <span>{item.title}</span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-slate-400 text-xs">
                      ${item.price}
                    </span>
                    {item.qty > 1 ? (
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 shrink-0 rounded-full"
                        onClick={() => onDecreaseQty(item, item.qty - 1)}
                      >
                        <MinusIcon className="h-4 w-4" />
                        <span className="sr-only">Decrease</span>
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 shrink-0 rounded-full"
                        onClick={() => onRemoveItem(item)}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Decrease</span>
                      </Button>
                    )}
                    <div className="flex-1 text-center">{item.qty}</div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0 rounded-full"
                      onClick={() => onIncreaseQty(item, item.qty + 1)}
                    >
                      <PlusIcon className="h-4 w-4" />
                      <span className="sr-only">Increase</span>
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-5xl">Empty Cart!</div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span>Total Price:</span>
            <span>{totalPrice}</span>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
