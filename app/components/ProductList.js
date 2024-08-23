// components/ProductList.js

export default function ProductList({ products }) {
    return (
      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="product-item">
            <h3>{product.title}</h3>
            <p>Price: {product.discountedPrice}</p>
            <p>Category: {product.category}</p>
          </div>
        ))}
      </div>
    );
  }
  