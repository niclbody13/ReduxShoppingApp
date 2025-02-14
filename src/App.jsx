import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setItems } from './redux/itemsSlice'

import DisplayItems from './components/Items'
import DisplayCart from './components/Cart'

import { Global, css } from '@emotion/react'

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
            <Global
                styles={css`
          body {
              background-color: #E6E6FA;
            }
        h1 {
            text-align: center;
            font-size: 2.5rem;
            margin-bottom: 0;
        }
            `}
            />
            <div>
                <h1>Welcome to the Candy Store!</h1>
                <DisplayCart />
                <DisplayItems />
            </div>
        </>
    )
}

// { type: 'INCREMENT', amount: 3 }
// { type: 'DECREMENT', amount: 3 }
