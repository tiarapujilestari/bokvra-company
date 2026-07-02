import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { products } from "@/data/products";
import type { Product } from "@/types";

const STORAGE_KEY = "bokvra_products";

interface MenuContextType {
  menus: Product[];

  addMenu: (menu: Product) => void;

  updateMenu: (menu: Product) => void;

  deleteMenu: (id: string) => void;

  getMenu: (id: string) => Product | undefined;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuProvider({ children }: { children: ReactNode }) {
  const [menus, setMenus] = useState<Product[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
      setMenus(products);
      return;
    }

    setMenus(JSON.parse(raw));
  }, []);

  function saveMenus(data: Product[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setMenus(data);
  }

  function addMenu(menu: Product) {
    const updated = [...menus, menu];

    saveMenus(updated);
  }

  function updateMenu(menu: Product) {
    const updated = menus.map((item) => (item.id === menu.id ? menu : item));

    saveMenus(updated);
  }

  function deleteMenu(id: string) {
    const updated = menus.filter((item) => item.id !== id);

    saveMenus(updated);
  }

  function getMenu(id: string) {
    return menus.find((item) => item.id === id);
  }

  return (
    <MenuContext.Provider
      value={{
        menus,
        addMenu,
        updateMenu,
        deleteMenu,
        getMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error("useMenu must be used inside MenuProvider");
  }

  return context;
}
