import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import styled from "@emotion/styled";
import {
  selectCart,
  addToCart,
  removeFromCart,
  clearCart,
} from "../redux/cartSlice";
import { incrementStock, decrementStock } from "../redux/itemsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const CartDiv = styled.div`
  background-color: #e6e6fa;
  box-shadow: 0 2px 4px 0;
  margin: 1rem;
  padding: 1rem;
`;

const CartStyle = styled.button`
  float: right;
  border: none;
  background: none;
  cursor: pointer;
`;

const DialogStyle = styled.dialog`
  width: 50%;
  height: 75%;
  border-radius: 5px;
  border: none;
  box-shadow: 0 4px 8px 0;
  position: fixed;
  scrollbar-width: thin;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0.25rem;
  border: none;
  background-color: #fff;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.5rem;
`;

const RemoveButton = styled.button`
  border: none;
  border-radius: 6px;
  padding: 0.5rem 2rem;
  background-color: #ffb7ce;
  box-shadow: 0 1px 2px 0 #aaa;
  cursor: pointer;
`;

const CheckoutButton = styled.button`
  float: right;
  bottom: 0;
  left: 1rem;
  margin: 1rem 0;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 2rem;
  background-color: #ffb7ce;
  box-shadow: 0 1px 2px 0 #aaa;
  cursor: pointer;
`;

const TotalPrice = styled.h2`
  float: left;
  bottom: 0;
  right: 1rem;
  margin: 1rem 0;
`;

export default function DisplayCart() {
  const dispatch = useDispatch();
  const data = useSelector(selectCart);
  console.log("CART: ", data);
  const openDialog = () => {
    const cart = document.getElementById("cartDialog");
    cart.showModal();
  };

  const closeDialog = () => {
    const cart = document.getElementById("cartDialog");
    cart.close();
  };

  const clearItems = () => {
    dispatch(clearCart());
  };

  const removeItem = (item, quantity) => {
    // console.log("DATA: ", data)
    console.log("ITEM: ", item);
    console.log("QUANTITY: ", quantity);

    dispatch(removeFromCart({ item }));
    dispatch(incrementStock({ item, quantity }));
  };

  let totalPrice = 0;
  data.forEach((e) => {
    const total = e.item.price * e.quantity;
    totalPrice += total;
  });

  return (
    <>
      <CartStyle onClick={openDialog}>
        <FontAwesomeIcon style={{ fontSize: "1.5rem" }} icon={faCartShopping} />
        {data.length}
      </CartStyle>
      <DialogStyle id="cartDialog">
        {data.length === 0 && <h3>Your cart is empty!</h3>}
        {data.map((object) => (
          <CartDiv key={object.item.id}>
            <h3 style={{ marginBottom: 0 }}>{object.item.name}</h3>
            <p>Price-Per-Unit: ${object.item.price}</p>
            <p>Quantity: {object.quantity}</p>
            <p>
              Total cost of units: $
              {(object.item.price * object.quantity).toFixed(2)}
            </p>
            <RemoveButton
              onClick={() => removeItem(object.item, object.quantity)}
            >
              Remove
            </RemoveButton>
          </CartDiv>
        ))}
        <CloseButton onClick={closeDialog}>&#120;</CloseButton>
        <TotalPrice>Total: ${totalPrice.toFixed(2)}</TotalPrice>
        {data.length > 0 ? (
          <CheckoutButton onClick={clearItems}>Checkout</CheckoutButton>
        ) : (
          <CheckoutButton style={{ cursor: "default" }} disabled>
            Checkout
          </CheckoutButton>
        )}
      </DialogStyle>
    </>
  );
}