import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { products } from "../../data/products";

type Line = { productId: string; quantity: number };

type CartState = {
  lines: Line[];
  add: (id: string) => void;
  remove: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  subtotalCents: number;
};

const CartContext = createContext<CartState | null>(null);
const storageKey = "savanna-cart-v1";

function initialLines(): Line[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
    if (!Array.isArray(saved)) return [];

    const quantities = new Map<string, number>();
    for (const line of saved) {
      if (
        !line ||
        typeof line.productId !== "string" ||
        !Number.isInteger(line.quantity) ||
        line.quantity < 1
      )
        continue;
      const product = products.find(({ id }) => id === line.productId);
      if (product && product.stock > 0) {
        const previous = quantities.get(product.id) ?? 0;
        quantities.set(
          product.id,
          Math.min(previous + line.quantity, product.stock),
        );
      }
    }
    return Array.from(quantities, ([productId, quantity]) => ({
      productId,
      quantity,
    }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState(initialLines);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(lines));
    } catch {
      // The cart remains available for the current session.
    }
  }, [lines]);

  function changeQuantity(
    id: string,
    nextQuantity: (quantity: number) => number,
  ) {
    const product = products.find((item) => item.id === id);
    if (!product) return;

    setLines((current) => {
      const existing = current.find((line) => line.productId === id);
      const quantity = Math.max(
        0,
        Math.min(product.stock, nextQuantity(existing?.quantity ?? 0)),
      );
      if (quantity === 0)
        return current.filter((line) => line.productId !== id);
      if (!existing) return [...current, { productId: id, quantity }];
      return current.map((line) =>
        line === existing ? { ...line, quantity } : line,
      );
    });
  }

  const subtotalCents = lines.reduce((total, line) => {
    const product = products.find(({ id }) => id === line.productId);
    return total + (product?.priceCents ?? 0) * line.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        lines,
        add: (id) => changeQuantity(id, (quantity) => quantity + 1),
        remove: (id) => changeQuantity(id, () => 0),
        setQuantity: (id, quantity) => {
          if (Number.isFinite(quantity))
            changeQuantity(id, () => Math.floor(quantity));
        },
        subtotalCents,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("useCart requiere CartProvider");
  return cart;
}
