import React from "react";
import { Pizza } from "./menu";

interface CartProps {
  cartItems: Pizza[];
}

const Cart: React.FC<CartProps> = ({ cartItems }) => {
  // Check if cartItems is undefined or null
  if (!cartItems) {
    return <div>No items in the cart</div>;
  }

  // Create an object to store counts of each pizza
  const pizzaCounts: { [name: string]: number } = {};

  // Count the occurrences of each pizza in the cart
  cartItems.forEach((item) => {
    if (item.name in pizzaCounts) {
      pizzaCounts[item.name]++;
    } else {
      pizzaCounts[item.name] = 1;
    }
  });

  return (
    <div className="flex flex-col justify-end items-center">
      <h2>Cart Items</h2>
      <ul>
        {Object.entries(pizzaCounts).map(([name, count]) => {
          const item = cartItems.find((pizza) => pizza.name === name);
          if (!item) return null;
          return (
            <li key={name}>
              {count} {item.name} - ₹{parseInt(item.price) * count}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Cart;
