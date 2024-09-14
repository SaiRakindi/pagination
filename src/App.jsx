import { useEffect } from "react";

function App() {
  const fetchProducts = async () => {
    const response = await fetch("https://dummyjson.com/products?limit=100");
    const data = await response.json();

    console.log("data", data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return <div>Pagination</div>;
}

export default App;
