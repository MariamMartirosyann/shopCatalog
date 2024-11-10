import { useState, useEffect } from "react";
import { categories, brands, ratings, catalogData } from "../../Utils/Constans";
import { ProductList } from "../ProductList/ProductList";
import CircularProgress from "@mui/material/CircularProgress";
import { useDebounce } from "../../Utils/Hooks/useDebounce";
import "./style.css";
import { useSelector } from "react-redux";

const ProductFilter = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [sortCriteria, setSortCriteria] = useState("popularity");

  const isFilterMenuVisible = useSelector((store) => store.common.visibility);
  // Debounced values for search and price range
  const debouncedSearchItem = useDebounce(searchItem, 3000);
  const debouncedPriceRange = useDebounce(priceRange, 300);

  // Load user preferences on mount
  useEffect(() => {
    const savedFilters =
      JSON.parse(localStorage.getItem("userPreferences")) || {};
    setSelectedCategory(savedFilters.selectedCategory || []);
    setSelectedBrand(savedFilters.selectedBrand || []);
    setPriceRange(savedFilters.priceRange || [0, 1000]);
    setSelectedRating(savedFilters.selectedRating || 0);
    setSearchItem(savedFilters.searchItem || "");
    setSortCriteria(savedFilters.sortCriteria || "popularity");
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleBrandChange = (brand) => {
    setSelectedBrand((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
  };

  const handlePriceRangeChange = (index, value) => {
    setPriceRange((prevRange) => {
      const newRange = [...prevRange];
      newRange[index] = Number(value);
      return newRange;
    });
  };

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
  };

  const clearFilters = () => {
    setSelectedCategory([]);
    setSelectedBrand([]);
    setPriceRange([0, 1000]);
    setSelectedRating(0);
    setSearchItem("");
    setSortCriteria("popularity");
  };

  const filtered = catalogData
    .filter((product) => {
      const matchesSearchText = debouncedSearchItem
        ? product.name.toLowerCase().includes(debouncedSearchItem) ||
          product.brand.toLowerCase().includes(debouncedSearchItem) ||
          product.category.toLowerCase().includes(debouncedSearchItem)
        : true;
      const matchesCategory = selectedCategory.length
        ? selectedCategory.includes(product.category)
        : true;
      const matchesBrand = selectedBrand.length
        ? selectedBrand.includes(product.brand)
        : true;
      const matchesPrice =
        product.price >= debouncedPriceRange[0] &&
        product.price <= debouncedPriceRange[1];
      const matchesRating = selectedRating
        ? product.rating >= selectedRating
        : true;

      return (
        matchesSearchText &&
        matchesCategory &&
        matchesBrand &&
        matchesPrice &&
        matchesRating
      );
    })
    .sort((a, b) => {
      switch (sortCriteria) {
        case "priceAsc":
          return a.price - b.price;
        case "priceDesc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "popularity":
          return b.popularity - a.popularity;
        default:
          return 0;
      }
    });

  const applyFilters = () => {
    setFilteredData(filtered);
  };

  const savePreferences = () => {
    const preferences = {
      selectedCategory,
      filteredData,
      selectedBrand,
      priceRange,
      selectedRating,
      searchItem,
      sortCriteria,
      catalogData,
    };
    localStorage.setItem("userPreferences", JSON.stringify(preferences));
  };
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      applyFilters();
      setLoading(false);
    }, 700);
    savePreferences();

    return () => clearTimeout(timer);
  }, [
    debouncedSearchItem,
    selectedCategory,
    selectedBrand,
    debouncedPriceRange,
    selectedRating,
    sortCriteria,
  ]);

  return (
    <div>
      <div className="main">
        {isFilterMenuVisible ? (
          <div className="filtersDiv">
            <div className="categoryItem">
              <h2>Filters</h2>
              <button className="clearFilters" onClick={clearFilters}>
                Clear Filters
              </button>
              <input
                type="text"
                data-testid="search"
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
                placeholder="Search"
              />
            </div>
            <div className="categoryItem">
              <h3>Sort By</h3>
              <select
                value={sortCriteria}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="popularity">Popularity</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            <div className="categoryItem">
              <h3>Category</h3>
              {categories.map((category) => (
                <label key={category}>
                  <input
                    type="checkbox"
                    checked={selectedCategory.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  {category}
                </label>
              ))}
            </div>

            <div className="categoryItem">
              <h3>Brand</h3>
              {brands.map((brand) => (
                <label key={brand}>
                  <input
                    type="checkbox"
                    checked={selectedBrand.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                  />
                  {brand}
                </label>
              ))}
            </div>

            <div className="categoryItem">
              <h3>Price Range</h3>
              <span>${debouncedPriceRange[0]} - Min Range</span>
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[0]}
                onChange={(e) => handlePriceRangeChange(0, e.target.value)}
              />
              <span>${debouncedPriceRange[1]} - Max Range</span>
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) => handlePriceRangeChange(1, e.target.value)}
              />
            </div>

            <div className="categoryItem">
              <h3>Rating</h3>
              {ratings.map((rating) => (
                <label key={rating}>
                  <input
                    type="radio"
                    name="rating"
                    checked={selectedRating === rating}
                    onChange={() => handleRatingChange(rating)}
                  />
                  {rating} & up
                </label>
              ))}
            </div>
          </div>
        ) : null}

        {loading ? (
          <CircularProgress size="30%" style={{ margin: "auto" }} />
        ) : filteredData.length > 0 ? (
          <ProductList products={filteredData} />
        ) : (
          <div className="notFound">No products found.</div>
        )}
      </div>
    </div>
  );
};

export default ProductFilter;
