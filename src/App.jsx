import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await fetch("https://dummyjson.com/products?limit=100");
    const data = await response.json();

    if (data && data.products) setProducts(data.products);
  };

  console.log(products);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {products.length > 0 && (
        <ul className="products">
          {products.map((product) => (
            <li className="products-item" key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <span>{product.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
