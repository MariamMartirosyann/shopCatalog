import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import ProductFilter from "../Filter/ProductFilter"
import { categories,brands } from "../../Utils/Constans";



const mockStore = configureStore([]);
const store = mockStore({
  common: { visibility: true },
});

describe("ProductFilter Component", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    render(
      <Provider store={store}>
        <ProductFilter />
      </Provider>
    );

    expect(screen.getByText("Filters")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
    expect(screen.getByText("Sort By")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Brand")).toBeInTheDocument();
  });

  it("filters by category", () => {
    render(
      <Provider store={store}>
        <ProductFilter />
      </Provider>
    );

    const categoryCheckbox = screen.getByLabelText(categories[0]);
    fireEvent.click(categoryCheckbox);
    
    // Check if the filter updates after category selection
    expect(categoryCheckbox).toBeChecked();
  });

  it("filters by search term", () => {
    render(
      <Provider store={store}>
        <ProductFilter />
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "sample search" } });

    // Check if search input value is updated
    expect(searchInput.value).toBe("sample search");
  });

  it("sorts products by price ascending", () => {
    render(
      <Provider store={store}>
        <ProductFilter />
      </Provider>
    );

    const sortSelect = screen.getByText("Sort By").nextSibling;
    fireEvent.change(sortSelect, { target: { value: "priceAsc" } });

    // Check if sort criteria is set correctly
    expect(sortSelect.value).toBe("priceAsc");
  });

  it("resets filters", () => {
    render(
      <Provider store={store}>
        <ProductFilter />
      </Provider>
    );

    // Apply filters first
    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "example" } });
    const categoryCheckbox = screen.getByLabelText(categories[0]);
    fireEvent.click(categoryCheckbox);

    // Clear filters
    const clearButton = screen.getByText("Clear Filters");
    fireEvent.click(clearButton);

    // Check if filters are reset
    expect(searchInput.value).toBe("");
    expect(categoryCheckbox).not.toBeChecked();
  });

  it("saves and loads preferences from localStorage", () => {
    localStorage.setItem(
      "userPreferences",
      JSON.stringify({
        selectedCategory: [categories[0]],
        selectedBrand: [brands[0]],
        priceRange: [100, 500],
        selectedRating: 3,
        searchItem: "example",
        sortCriteria: "priceDesc",
      })
    );

    render(
      <Provider store={store}>
        <ProductFilter />
      </Provider>
    );

    // Verify loaded preferences from localStorage
    const searchInput = screen.getByPlaceholderText("Search");
    const categoryCheckbox = screen.getByLabelText(categories[0]);
    const brandCheckbox = screen.getByLabelText(brands[0]);
    const sortSelect = screen.getByText("Sort By").nextSibling;

    expect(searchInput.value).toBe("example");
    expect(categoryCheckbox).toBeChecked();
    expect(brandCheckbox).toBeChecked();
    expect(sortSelect.value).toBe("priceDesc");
  });
});
