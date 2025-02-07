import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setItems } from './redux/itemsSlice'

import DisplayItems from './components/Items'
import DisplayCart from './components/Cart'

export default function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {    
        try {
            const res = await fetch('/products.json')
            const resBody = await res.json()
            console.log(resBody)
            dispatch(setItems(resBody))
            // setData(resBody)
        } catch (err) {
            if (err.name === "AbortError") {
                console.log("HTTP request was aborted")
            } else {
                console.error(err)
            }
            return null
        }
    }
    
    return (
       <>
            <h1>
                Penny Candy Store
            </h1>
            <DisplayCart />
            <DisplayItems/>
        </>
    )
}

// { type: 'INCREMENT', amount: 3 }
// { type: 'DECREMENT', amount: 3 }
