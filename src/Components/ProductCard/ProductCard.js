import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div data-testid="card" key={product?.id} className="product"  >
      <div>
        <img width={250} height={200} src={product?.imageUrl}  alt="procat-image"/>
      </div>
      <div>
        <span className="bold">Category :</span> {product?.category}{" "}
      </div>
      <div>
        {" "}
        <span className="bold">Name :</span> {product?.name},{" "}
        <span className="bold">{product?.brand}</span>
      </div>
      <div>
        <span className="bold">Price :</span> {product?.price},{" "}
        <span className="bold">Rating :</span> {product?.rating}
      </div>
    </div>
  );
};

export default ProductCard;
