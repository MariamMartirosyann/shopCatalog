import { useState } from "react";
import { categories, brands, ratings, catalogData } from "../../Utils/Constans";
import { ProductList } from "../ProductList/ProductList";
import "./style.css";

const ProductFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedRating, setSelectedRating] = useState(0);

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

  const clearFilters = () => {
    setSelectedCategory([]);
    setSelectedBrand([]);
    setPriceRange([0, 1000]);
    setSelectedRating(0);
  };
  const filteredProducts = catalogData.filter((product) => {
    const matchesCategory = selectedCategory.length
      ? selectedCategory.includes(product.category)
      : true;
    const matchesBrand = selectedBrand.length
      ? selectedBrand.includes(product.brand)
      : true;
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesRating = selectedRating
      ? product.rating >= selectedRating
      : true;

    return matchesCategory && matchesBrand && matchesPrice && matchesRating;
  });

  return (
    <div className="main">
      <div className="filtersDiv">
        <button
          className="clearFilters"
          onClick={clearFilters}
          style={{
            backgroundColor: "rgb(61, 61, 240)",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius:"5%"
          }}
        >
          Clear Filters
        </button>

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

        <div>
          <h3>Price Range</h3>
          <div className="categoryItem">
            ${priceRange[0]} -Min Range
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[0]}
              onChange={(e) => handlePriceRangeChange(0, e.target.value)}
            />
            ${priceRange[1]}-Max Range
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) => handlePriceRangeChange(1, e.target.value)}
            />
          </div>
          <p></p>
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

      <ProductList products={filteredProducts} />
    </div>
  );
};

export default ProductFilter;
