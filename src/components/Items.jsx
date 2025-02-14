import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import styled from '@emotion/styled'

import { incrementStock, selectItems, decrementStock, setItems } from '../redux/itemsSlice'
import { addToCart, removeFromCart } from '../redux/cartSlice'

const AddItemForm = styled.form`
    margin: 3px;
    button {
        margin-left: 5px;
    }
    `

const Item = styled.div`
    clear: both;
    margin-top: 4rem;
    display: flex;
    justify-content: center;
    ul {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 12px;
        list-style: none;    
        margin: 1rem;
        max-width: 100rem;
    }
    
    li {
        border: 1px solid #d5d9d9;
        border-radius: 6px;
        padding: 1rem;
        background-color: #fff;
        box-shadow: 0 1px 2px 0 #aaa;
    }

    li h3 {
        text-wrap: nowrap;
    }
`

const ItemImage = styled.img`
    /* height: 12rem; */
    width: 100%;
    padding-bottom: 2rem;
`

const InputStyle = styled.div`
    position: absolute;
    bottom: 1rem;
    display: flex;
    width: 100%;
    /* padding: 1rem; */
    left: 0;
    right: 0;
    justify-content: center;
`

const ListStyle = styled.li`
    position: relative;
`

const Input = styled.input`
    width: 25%;
`

export const ButtonStyle = styled.button`
    border: none;
    border-radius: 6px;
    padding: 0.25rem 0;
    width: 60%;
    background-color: #ffb7ce;
    box-shadow: 0 1px 2px 0 #aaa;
`


export default function DisplayItems() {
    const dispatch = useDispatch()
    const data = useSelector(selectItems)

    return (
        <Item>
            <ul>
                {data.map((item) => (
                    <ListStyle key={item.id}>
                        <h3>{item.name}</h3>
                        <h2>${item.price.toFixed(2)}</h2>
                        <p>In Stock: {item.inStock}</p>
                        <ItemImage src={item.photoUrl} alt={`Picture of ${item.name}`} />
                        <AddItemForm onSubmit={(e) => {
                            e.preventDefault()
                            // console.log("Added new item:",  e.target[0].value)
                            // console.log("Added new item:",  e.target.querySelector('input').value)
                            const quantity = Number(e.target.querySelector('input').value)
                            dispatch(addToCart({item, quantity}))
                            dispatch(decrementStock({item, quantity}))
                        }}>
                            <InputStyle>
                                <Input min='1' max={item.inStock} type='number' defaultValue='0' />
                                {item.inStock > 0 ? (<ButtonStyle style={{cursor: 'pointer'}}>Add to Cart</ButtonStyle>) : <ButtonStyle disabled>Out of Stock</ButtonStyle>}
                            </InputStyle>
                            
                        </AddItemForm>
                    </ListStyle>
                ))}
            </ul>
        </Item>
    );
}