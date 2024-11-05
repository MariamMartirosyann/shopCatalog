import "./style.css";

export const ProductList = ({ products }) => (
    <div className="products">
        {" "}
        {products?products.map((product) => {
          return (
            <div key={product.id} className="product">
              <div>
                <img width={250} height={200} src={product.imageUrl} />
              </div>
              <div>
                <span className="bold">Category :</span> {product.category}{" "}
              </div>
              <div>
                {" "}
                <span className="bold">Name :</span> {product.name},{" "}
                <span className="bold">{product.brand}</span>
              </div>
              <div>
                <span className="bold">Price :</span> {product.price},{" "}
                <span className="bold">Rating :</span> {product.rating}
              </div>
            </div>
          );
        }):null}
      </div>
  );
