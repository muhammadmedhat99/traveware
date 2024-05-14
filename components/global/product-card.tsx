import { ShoppingCart } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";

interface ProductCardProps {
  id: number;
  title: string;
  description: string;
  price: number;
  oldPrice: number;
}

export const ProductCard = ({
  id,
  title,
  description,
  price,
  oldPrice,
}: ProductCardProps) => {
  const { dispatch, REDUCER_ACTIONS } = useCart();

  const onAddToCart = () => {
    dispatch({
      type: REDUCER_ACTIONS.ADD,
      payload: {
        id,
        title,
        description,
        price,
        oldPrice,
        qty: 1,
      },
    });

    toast.success("Added To Cart");
  };

  return (
    <Card className="w-[150px] h-[175px] md:min-w-[300px] grow flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="truncate h-5">{title}</CardTitle>
        <CardDescription className="h-10 text-ellipsis overflow-hidden">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between flex-wrap md:flex-nowrap">
        <div className="flex items-end gap-1.5">
          <span className="font-semibold text-slate-800 text-sm">${price}</span>
        </div>

        <Button variant="outline" onClick={onAddToCart}>
          <ShoppingCart className="w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  );
};
