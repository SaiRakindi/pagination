import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const response = await fetch("https://dummyjson.com/products?limit=100");
    const data = await response.json();

    if (data && data.products) setProducts(data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const selectPageHandler = (selectedPage) => {
    setPage(selectedPage);
  };

  return (
    <div>
      {products.length > 0 && (
        <ul className="products">
          {products.slice(page * 10 - 10, page * 10).map((product) => (
            <li className="products-item" key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <span>{product.title}</span>
            </li>
          ))}
        </ul>
      )}

      {products.length > 0 && (
        <div className="pagination">
          <button
            onClick={() => {
              if (page > 1) selectPageHandler(page - 1);
            }}
            disabled={page === 1}
          >
            ◀
          </button>
          {[...Array(products.length / 10)].map((_, index) => {
            return (
              <button
                key={index}
                onClick={() => selectPageHandler(index + 1)}
                disabled={page === index + 1}
              >
                {index + 1}
              </button>
            );
          })}
          <button
            disabled={page === 10}
            onClick={() => {
              if (page < products.length / 10) selectPageHandler(page + 1);
            }}
          >
            ▶
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
