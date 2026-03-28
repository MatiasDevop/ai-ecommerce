import { render, screen } from "@testing-library/react";
import { StockBadge } from "@/components/app/StockBadge";

const useCartItemMock = vi.fn();

vi.mock("@/lib/store/cart-store-provider", () => ({
  useCartItem: (productId: string) => useCartItemMock(productId),
}));

describe("components/app/StockBadge", () => {
  it("shows a max-in-cart badge when the cart quantity matches stock", () => {
    useCartItemMock.mockReturnValue({ quantity: 2 });

    render(<StockBadge productId="chair-1" stock={2} />);

    expect(screen.getByText("Max in cart")).toBeInTheDocument();
  });

  it("shows a low-stock badge when stock is low and the cart is below the limit", () => {
    useCartItemMock.mockReturnValue({ quantity: 1 });

    render(<StockBadge productId="chair-1" stock={3} />);

    expect(screen.getByText("Only 3 left in stock")).toBeInTheDocument();
  });

  it("renders nothing when stock is healthy and not maxed out", () => {
    useCartItemMock.mockReturnValue(undefined);

    const { container } = render(<StockBadge productId="chair-1" stock={12} />);

    expect(container).toBeEmptyDOMElement();
  });
});
