import React, { useState, useMemo } from "react";
import { catalogData } from "../Utils/Constans";

import { ProductList } from "./ProductList/ProductList";
import ProductFilter from "./Filter/ProductFilter";

const Catalog = () => {
  const [category, setCategory] = useState();
  const [brand, setBrand] = useState();
 

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };
  const handleChangeBrand = (e) => {
    setBrand(e.target.value);
  };

  const filterdByCatalog = catalogData.filter(
    (p) => p.category.toLocaleLowerCase() === category

  );


// const brandData=filterdByCatalog||catalogData

//   const filterByBrand = brandData.filter(
//     (p) => p.brand.toLocaleLowerCase() === brand
//   );

  const filteredData=filterdByCatalog||catalogData
  return (
    <>
      {/* <select name="category" value={category} onChange={handleChangeCategory}>
        <option>Select Category</option>
        <option value="electronics">Electronics</option>
        <option value="footwear">Footwear</option>
        <option value="clothing">Clothing</option>
      </select>

      <select name="category" value={category} onChange={handleChangeBrand}>
        <option>Select Brand</option>
        <option value="brand a">Brand A</option>
        <option value="brand b">Brand B</option>
        <option value="brand c">Brand C</option>
        <option value="brand d">Brand D</option>
        <option value="brand e">Brand E</option>
      </select> */}
      <ProductFilter/>

        <ProductList products={filteredData} />
        <ProductList products={catalogData} />
     
    </>
  );
};

export default Catalog;
