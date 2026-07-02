import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { products as seedProducts } from "@/data/products";
import type { Product } from "@/types";

/**
 * Menu/product data layer.
 *
 * Like BlogContext, this runs on localStorage so the project works fully
 * offline out of the box. Only the *additional* items created by an admin
 * are persisted as full records — the original photographed menu in
 * `data/products.ts` always stays as-is in source. On top of that, admins
 * can also "hide" any item (seed or custom) without deleting it, which is
 * just a list of ids stored separately. Swap the bodies of `addProduct`,
 * `removeProduct`, and `setHidden` for real API calls (e.g. Backendless)
 * whenever a backend is wired up.
 */

const EXTRA_PRODUCTS_KEY = "bokvra_extra_products";
const HIDDEN_IDS_KEY = "bokvra_hidden_product_ids";

interface ProductContextValue {
  /** Only items visible to regular visitors (hidden ones filtered out). */
  products: Product[];
  /** Every item, including hidden ones — for the admin management view. */
  allProducts: Product[];
  hiddenIds: string[];
  addProduct: (product: Omit<Product, "id">) => Product;
  removeProduct: (id: string) => void;
  setHidden: (id: string, hidden: boolean) => void;
  isCustomProduct: (id: string) => boolean;
}

const ProductContext = createContext<ProductContextValue | undefined>(
  undefined,
);

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function readExtraProducts(): Product[] {
  const raw = localStorage.getItem(EXTRA_PRODUCTS_KEY);
  return raw ? (JSON.parse(raw) as Product[]) : [];
}

function writeExtraProducts(items: Product[]) {
  localStorage.setItem(EXTRA_PRODUCTS_KEY, JSON.stringify(items));
}

function readHiddenIds(): string[] {
  const raw = localStorage.getItem(HIDDEN_IDS_KEY);
  return raw ? (JSON.parse(raw) as string[]) : [];
}

function writeHiddenIds(ids: string[]) {
  localStorage.setItem(HIDDEN_IDS_KEY, JSON.stringify(ids));
}

export function ProductProvider({ children }: { children: ReactNode }) {
  const [extraProducts, setExtraProducts] = useState<Product[]>([]);
  const [hiddenIds, setHiddenIds] = useState<string[]>([]);

  useEffect(() => {
    setExtraProducts(readExtraProducts());
    setHiddenIds(readHiddenIds());
  }, []);

  function addProduct(product: Omit<Product, "id">) {
    const id = `${slugify(product.name)}-${Date.now().toString(36)}`;
    const newProduct: Product = { ...product, id };
    const updated = [newProduct, ...extraProducts];
    setExtraProducts(updated);
    writeExtraProducts(updated);
    return newProduct;
  }

  function removeProduct(id: string) {
    const updated = extraProducts.filter((p) => p.id !== id);
    setExtraProducts(updated);
    writeExtraProducts(updated);

    if (hiddenIds.includes(id)) {
      const updatedHidden = hiddenIds.filter((hid) => hid !== id);
      setHiddenIds(updatedHidden);
      writeHiddenIds(updatedHidden);
    }
  }

  function setHidden(id: string, hidden: boolean) {
    const updated = hidden
      ? [...new Set([...hiddenIds, id])]
      : hiddenIds.filter((hid) => hid !== id);
    setHiddenIds(updated);
    writeHiddenIds(updated);
  }

  function isCustomProduct(id: string) {
    return extraProducts.some((p) => p.id === id);
  }

  const allProducts = [...extraProducts, ...seedProducts];
  const visibleProducts = allProducts.filter((p) => !hiddenIds.includes(p.id));

  return (
    <ProductContext.Provider
      value={{
        products: visibleProducts,
        allProducts,
        hiddenIds,
        addProduct,
        removeProduct,
        setHidden,
        isCustomProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx)
    throw new Error("useProducts must be used within a ProductProvider");
  return ctx;
}
