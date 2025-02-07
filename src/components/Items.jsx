import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import styled from '@emotion/styled'

import { incrementStock, selectItems, decrementStock } from '../redux/itemsSlice'
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
    ul {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        list-style: none;    
        margin: 1rem;
    }

    li {
        border: 1px solid firebrick;
        padding: 1rem;
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
    /* padding: 1rem; */
`

const ListStyle = styled.li`
    position: relative;
`

const Input = styled.input`
    width: 35%;
`


export default function DisplayItems() {
    const dispatch = useDispatch()
    const data = useSelector(selectItems)
    return (
        <Item>
            <ul>
                {data.map((item) => (
                    <ListStyle key={item.id}>
                        <p>Name: {item.name}</p>
                        <p>Price: {item.price}</p>
                        <p>In Stock: {item.inStock}</p>
                        <ItemImage src={item.photoUrl} alt={`Picture of ${item.name}`} />
                        <AddItemForm onSubmit={(e) => {
                            e.preventDefault()
                            // console.log("Added new item:",  e.target[0].value)
                            console.log("Added new item:",  e.target.querySelector('input').value)
                            const quantity = Number(e.target.querySelector('input').value)
                            dispatch(addToCart({item, quantity}))
                            dispatch(decrementStock({item, quantity}))
                        }}>
                            <InputStyle>
                                <Input min='1' max={item.inStock} type='number' defaultValue='0'/>
                                {item.inStock > 0 ? (<button>Add to Cart</button>) : <button disabled>Out of Stock</button>}
                            </InputStyle>
                            
                        </AddItemForm>
                    </ListStyle>
                ))}
            </ul>
        </Item>
    );
}


// function AddItem() {    
//     const [ text, setText ] = useState("")
//     const dispatch = useDispatch()
//     return (
//         <AddItemForm onSubmit={(e) => {
//             e.preventDefault()
//             console.log("Added new item:", text)
//             dispatch(addItem(text))
//             setText("")
//         }}>
//         <input type='number' value={text} onChange={(e) => setText(e.target.value)} />
//         <button>Add to Cart</button>
//         </AddItemForm>
//     )
// }