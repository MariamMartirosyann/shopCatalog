import "./style.css";
import ProductCard from "../ProductCard/ProductCard";

export const ProductList = ({ products }) => (
  <div  data-testid="list"className="products">
    
    {products
      ? products.map((product) => {
          return <ProductCard product={product}  />;
        })
      : null}
  </div>
);
