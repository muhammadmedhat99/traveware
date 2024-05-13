import { ReactElement, createContext, useMemo, useReducer } from "react";

export type CartItemsType = {
  id: number;
  title: string;
  description: string;
  price: number;
  oldPrice: number;
  qty: number;
};

type CartStateType = { cart: CartItemsType[] };

const initCartState: CartStateType = { cart: [] };

const REDUCER_ACTION_TYPES = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  QUANTITY: "QUANTITY",
};

export type ReducerActionTypes = typeof REDUCER_ACTION_TYPES;

export type ReducerAction = {
  type: string;
  payload?: CartItemsType;
};

const reducer = (
  state: CartStateType,
  action: ReducerAction
): CartStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPES.ADD: {
      if (!action.payload) {
        throw new Error("action missed in add");
      }

      const { id, title, description, price, oldPrice } = action.payload;

      const filteredCart: CartItemsType[] = state.cart.filter(
        (item) => item.id !== id
      );

      const itemExist: CartItemsType | undefined = state.cart.find(
        (item) => item.id === id
      );

      const qty: number = itemExist
        ? itemExist.qty
          ? itemExist.qty + 1
          : 1
        : 1;

      return {
        ...state,
        cart: [
          ...filteredCart,
          { id, title, description, price, oldPrice, qty },
        ],
      };
    }

    case REDUCER_ACTION_TYPES.REMOVE: {
      if (!action.payload) {
        throw new Error("action missed in remove");
      }

      const { id } = action.payload;

      const filteredCart: CartItemsType[] = state.cart.filter(
        (item) => item.id !== id
      );

      return { ...state, cart: [...filteredCart] };
    }

    case REDUCER_ACTION_TYPES.QUANTITY: {
      if (!action.payload) {
        throw new Error("action missed in quantity");
      }

      const { id, qty } = action.payload;

      const itemExist: CartItemsType | undefined = state.cart.find(
        (item) => item.id === id
      );

      if (!itemExist) {
        throw new Error("Item Must Be At The Cart");
      }

      const updatedItem: CartItemsType = { ...itemExist, qty };

      const filteredCart: CartItemsType[] = state.cart.filter(
        (item) => item.id !== id
      );

      return { ...state, cart: [...filteredCart, updatedItem] };
    }

    default:
      throw new Error("Undefined Action");
  }
};

const useCartContext = (initCartState: CartStateType) => {
  const [state, dispatch] = useReducer(reducer, initCartState);

  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPES;
  }, []);

  const totalItems: number = state.cart.reduce((previousValue, cartItem) => {
    return previousValue + cartItem.qty;
  }, 0);

  const totalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(
    state.cart.reduce((previousValue, cartItem) => {
      return previousValue + cartItem.qty * cartItem.price;
    }, 0)
  );

  const cart = state.cart.sort((a, b) => a.title.localeCompare(b.title));

  return { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart };
};

export type useCartContextType = ReturnType<typeof useCartContext>;

const initCartContextState: useCartContextType = {
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPES,
  totalItems: 0,
  totalPrice: "",
  cart: [],
};

export const CartContext =
  createContext<useCartContextType>(initCartContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <CartContext.Provider value={useCartContext(initCartState)}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
