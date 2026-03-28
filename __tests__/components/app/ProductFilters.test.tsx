import { fireEvent, render, screen } from "@testing-library/react";
import { ProductFilters } from "@/components/app/ProductFilters";

const pushMock = vi.fn();
const useSearchParamsMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  useSearchParams: () => useSearchParamsMock(),
}));

vi.mock("@/components/ui/select", () => ({
  Select: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SelectTrigger: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className}>{children}</div>
  ),
  SelectValue: ({ placeholder }: { placeholder?: string }) => <span>{placeholder}</span>,
  SelectContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SelectItem: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock("@/components/ui/slider", () => ({
  Slider: ({ onValueCommit }: { onValueCommit?: (value: number[]) => void }) => (
    <button type="button" onClick={() => onValueCommit?.([100, 900])}>
      Commit price range
    </button>
  ),
}));

const categories = [
  {
    _id: "cat-1",
    title: "Chairs",
    slug: "chairs",
  },
] as const;

describe("components/app/ProductFilters", () => {
  beforeEach(() => {
    pushMock.mockReset();
  });

  it("submits the search term into the URL", () => {
    useSearchParamsMock.mockReturnValue(new URLSearchParams(""));

    render(<ProductFilters categories={[...categories]} />);

    fireEvent.change(screen.getByPlaceholderText("Search products..."), {
      target: { value: "sofa" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Search" }));

    expect(pushMock).toHaveBeenCalledWith("?q=sofa", { scroll: false });
  });

  it("clears all filters when the clear-all action is used", () => {
    useSearchParamsMock.mockReturnValue(new URLSearchParams("q=chair&inStock=true"));

    render(<ProductFilters categories={[...categories]} />);

    fireEvent.click(screen.getByRole("button", { name: /clear all filters/i }));

    expect(pushMock).toHaveBeenCalledWith("/", { scroll: false });
  });

  it("clears only the active search filter", () => {
    useSearchParamsMock.mockReturnValue(new URLSearchParams("q=chair&inStock=true"));

    render(<ProductFilters categories={[...categories]} />);

    fireEvent.click(screen.getByRole("button", { name: "Clear q filter" }));

    expect(pushMock).toHaveBeenCalledWith("?inStock=true", { scroll: false });
  });

  it("toggles the in-stock filter on", () => {
    useSearchParamsMock.mockReturnValue(new URLSearchParams(""));

    render(<ProductFilters categories={[...categories]} />);

    fireEvent.click(screen.getByRole("checkbox"));

    expect(pushMock).toHaveBeenCalledWith("?inStock=true", { scroll: false });
  });

  it("updates the price range when the slider commits a new value", () => {
    useSearchParamsMock.mockReturnValue(new URLSearchParams(""));

    render(<ProductFilters categories={[...categories]} />);

    fireEvent.click(screen.getByRole("button", { name: "Commit price range" }));

    expect(pushMock).toHaveBeenCalledWith("?minPrice=100&maxPrice=900", { scroll: false });
  });
});
