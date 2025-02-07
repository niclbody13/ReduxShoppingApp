import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import styled from '@emotion/styled'
import { selectCart, addToCart, removeFromCart, clearCart } from '../redux/cartSlice'
import { incrementStock, decrementStock } from '../redux/itemsSlice'

const CartDiv = styled.div`
    background-color: blanchedalmond;
    box-shadow: 0 4px 8px 0;
    margin: 1rem;
    padding: 1rem;
`

const CartStyle = styled.button`
    float: right;
`

const DialogStyle = styled.dialog`
    width: 75%;
    height: 90%;
    position: relative;
`

const CloseButton = styled.button`
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
`

export default function DisplayCart() {
    const dispatch = useDispatch()
    const data = useSelector(selectCart)
    console.log("CART: ", data)
    const openDialog = () => {
        const cart = document.getElementById('cartDialog')
        cart.showModal()
    }
    
    const closeDialog = () => {
        const cart = document.getElementById('cartDialog')
        cart.close()
    }

    const clearItems = () => {
        dispatch(clearCart())
    }

    const removeItem = (item, quantity) => {
        // console.log("DATA: ", data)
        // console.log("ITEM: ", item)
        // console.log("QUANTITY: ", quantity)

        dispatch(removeFromCart({item}))
        dispatch(incrementStock({item, quantity}))
    }

    let totalPrice = 0
    data.forEach((e) => {
        const total = e.item.price * e.quantity
        totalPrice += total
    })
    // console.log("price:", totalPrice)


    return (
        <>
            <CartStyle onClick={openDialog}>Cart ({data.length})</CartStyle>
            <DialogStyle id='cartDialog'>
                {data.map((object) => (
                    <CartDiv key={object.item.id}>
                        <p>Name: {object.item.name}</p>
                        <p>Price-Per-Unit: ${object.item.price}</p>
                        <p>Quantity: {object.quantity}</p>
                        <p>Total cost of units: ${(object.item.price * object.quantity).toFixed(2)}</p>
                        <button onClick={() => removeItem(object.item, object.quantity)}>Remove</button>
                    </CartDiv>
                ))}
                <CloseButton onClick={closeDialog}>X</CloseButton>
                <h3>Total: ${totalPrice.toFixed(2)}</h3>
                <button onClick={clearItems}>Checkout</button>
            </DialogStyle>
        </>
    )
}