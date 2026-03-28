import { createCartStore, defaultInitState } from "@/lib/store/cart-store";

const chair = {
  productId: "chair-1",
  name: "Oak Chair",
  price: 120,
  image: "/chair.jpg",
};

describe("lib/store/cart-store", () => {
  it("starts with the default state", () => {
    const store = createCartStore();

    expect(store.getState().items).toEqual(defaultInitState.items);
    expect(store.getState().isOpen).toBe(false);
  });

  it("adds a new item and merges quantities for duplicates", () => {
    const store = createCartStore();

    store.getState().addItem(chair, 1);
    store.getState().addItem(chair, 2);

    expect(store.getState().items).toEqual([
      {
        ...chair,
        quantity: 3,
      },
    ]);
  });

  it("updates quantity and removes an item when quantity reaches zero", () => {
    const store = createCartStore({
      items: [{ ...chair, quantity: 2 }],
      isOpen: false,
    });

    store.getState().updateQuantity(chair.productId, 5);
    expect(store.getState().items[0]?.quantity).toBe(5);

    store.getState().updateQuantity(chair.productId, 0);
    expect(store.getState().items).toEqual([]);
  });

  it("removes items and clears the cart", () => {
    const store = createCartStore({
      items: [
        { ...chair, quantity: 1 },
        { productId: "lamp-1", name: "Lamp", price: 80, quantity: 1 },
      ],
      isOpen: false,
    });

    store.getState().removeItem(chair.productId);
    expect(store.getState().items).toEqual([
      { productId: "lamp-1", name: "Lamp", price: 80, quantity: 1 },
    ]);

    store.getState().clearCart();
    expect(store.getState().items).toEqual([]);
  });

  it("toggles open state without persisting UI state", () => {
    const store = createCartStore({
      items: [{ ...chair, quantity: 1 }],
      isOpen: false,
    });

    store.getState().openCart();
    expect(store.getState().isOpen).toBe(true);

    store.getState().toggleCart();
    expect(store.getState().isOpen).toBe(false);

    store.getState().closeCart();
    expect(store.getState().isOpen).toBe(false);

    expect(store.persist.getOptions().partialize?.(store.getState())).toEqual({
      items: [{ ...chair, quantity: 1 }],
    });
  });
});
