import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProducts = async () => {
    const response = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const data = await response.json();

    if (data && data.products) {
      console.log("data", data);
      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / 10)); //fixed for decimal values
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const selectPageHandler = (selectedPage) => {
    setPage(selectedPage);
  };

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
          {[...Array(totalPages)].map((_, index) => {
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
            disabled={page === totalPages}
            onClick={() => {
              if (page < totalPages) selectPageHandler(page + 1);
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
