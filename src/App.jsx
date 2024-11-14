import { useState, useEffect } from "react";
import Header from "./components/Header";
import Pet from "./components/Pet";
import Card from "./components/Card";
import { db } from "./data/db";

function App() {
  const [dataApi, setDataApi] = useState([]); 
  const [data, setData] = useState(db);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [showCard, setShowCard] = useState(false);

  const MAX_ITEMS = 10;
  const MIN_ITEMS = 1;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    fetch("https://cat-fact.herokuapp.com/facts")
      .then((response) => response.json())
      .then((data) => setDataApi(data || []))
      .catch(() => setDataApi([{ text: "Error al cargar los datos curiosos." }]));
  }, []);

  function addToCart(item) {
    const itemExists = cart.findIndex((pet) => pet.id === item.id);
    if (itemExists >= 0) {
      cart[itemExists].quantity++;
      setCart([...cart]);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    setShowCard(true);
    setTimeout(() => setShowCard(false), 1000);
  }

  function removeFromCart(id) {
    setCart(cart.filter((item) => item.id !== id));
  }

  function increaseQuantity(id) {
    setCart(cart.map((item) => 
      item.id === id && item.quantity < MAX_ITEMS ? { ...item, quantity: item.quantity + 1 } : item
    ));
  }

  function decreaseQuantity(id) {
    setCart(cart.map((item) => 
      item.id === id && item.quantity > MIN_ITEMS ? { ...item, quantity: item.quantity - 1 } : item
    ));
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
        cartVisible={cart.length > 0}  
      />
      <main>
        <div className="container">
          <h1 className="text-center fw-bold">Nuestras Mascotas</h1>
          <div className="row my-5">
            {data.map((pet) => (
              <Pet key={pet.id} pet={pet} addToCart={addToCart} />
            ))}
          </div>
          <div className="row mt-5">
            <h2 className="text-center">Datos Curiosos</h2>
            {dataApi.length > 0 && (
              <p key={dataApi[0].text} className="text-center">{dataApi[0].text}</p> 
            )}
          </div>
        </div>
        {showCard && <Card />}
      </main>
    </>
  );
}

export default App;
