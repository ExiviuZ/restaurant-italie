import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}
function Header() {
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}
function Menu() {
  return (
    <main className="menu">
      <h2>Our Menu!</h2>
      {pizzaData.length > 0 ? (
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from our stone over, all organic, all delicious.
          </p>
          <ul className="pizzas">
            {pizzaData.map((pizza) => {
              return <Pizza pizzaElement={pizza} key={pizza.name} />;
            })}
          </ul>
        </>
      ) : (
        <p style={{ fontWeight: "bold" }}>We run outta pizza, mama mia!!</p>
      )}
    </main>
  );
}

function Pizza({
  pizzaElement: { name, ingredients, price, photoName, soldOut },
}) {
  return (
    <li className={`pizza ${soldOut ? "sold-out" : ""}`}>
      <img src={photoName} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>{ingredients}</p>
        <span className="price">{soldOut ? "SOLD OUT" : price}</span>
      </div>
    </li>
  );
}

function Footer() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      setCurrentTime(
        new Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: false,
        }).format(date)
      );
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const currenthour = new Date().getHours();
  const openHour = 10;
  const closedHour = 22;
  const hours = { openHour, closedHour, currentTime };
  let isOpen = currenthour >= openHour && currenthour <= closedHour;

  return (
    <footer className="footer">
      {isOpen ? <Open hours={hours} /> : <Close hours={hours} />}
    </footer>
  );
}

function Open({ hours: { closedHour, openHour, currentTime } }) {
  return (
    <div className="order">
      <p>
        We're open until {closedHour}:00; <br />{" "}
        <span style={{ letterSpacing: "2px" }}>
          Current Time - <span>{currentTime}</span>
        </span>
      </p>
      <button className="btn">Order</button>
    </div>
  );
}
function Close({ hours: { closedHour, openHour, currentTime } }) {
  return (
    <div>
      <div className="order">
        <p>
          Closed! We open between {openHour}:00 and {closedHour}:00 Current Time
          - <span>{currentTime}</span>
        </p>
        <button className="btn" disable="true">
          Order
        </button>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
