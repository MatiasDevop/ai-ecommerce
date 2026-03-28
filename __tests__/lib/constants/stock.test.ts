import {
  getStockMessage,
  getStockStatus,
  isLowStock,
  isOutOfStock,
  LOW_STOCK_THRESHOLD,
} from "@/lib/constants/stock";

describe("lib/constants/stock", () => {
  it("identifies low stock within the threshold", () => {
    expect(isLowStock(LOW_STOCK_THRESHOLD)).toBe(true);
    expect(isLowStock(1)).toBe(true);
    expect(isLowStock(LOW_STOCK_THRESHOLD + 1)).toBe(false);
  });

  it("identifies out-of-stock quantities", () => {
    expect(isOutOfStock(0)).toBe(true);
    expect(isOutOfStock(-1)).toBe(true);
    expect(isOutOfStock(2)).toBe(false);
  });

  it("returns the correct status for each stock bucket", () => {
    expect(getStockStatus(undefined)).toBe("unknown");
    expect(getStockStatus(0)).toBe("out_of_stock");
    expect(getStockStatus(LOW_STOCK_THRESHOLD)).toBe("low_stock");
    expect(getStockStatus(LOW_STOCK_THRESHOLD + 1)).toBe("in_stock");
  });

  it("returns the correct display message for each status", () => {
    expect(getStockMessage(undefined)).toBe("Stock status unknown");
    expect(getStockMessage(0)).toBe("OUT OF STOCK - Currently unavailable");
    expect(getStockMessage(3)).toBe("LOW STOCK - Only 3 left");
    expect(getStockMessage(8)).toBe("In stock (8 available)");
  });
});
