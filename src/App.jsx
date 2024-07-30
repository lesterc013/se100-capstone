import { useState } from 'react'
import './App.css'

function App() {
  const [stockSymbol, setStockSymbol] = useState('')
  const [quantity, setQuantity] = useState('')
  const [purchasePrice, setPurchasePrice] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(stockSymbol)
    console.log(quantity)
    console.log(purchasePrice)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name='stockSymbol'
          value={stockSymbol}
          type='text'
          onChange={(event) => setStockSymbol(event.target.value)}
        />
        <input
          name='quantity'
          value={quantity}
          type='text'
          onChange={(event) => setQuantity(event.target.value)}
        />
        <input
          name='purchasePrice'
          value={purchasePrice}
          type='text'
          onChange={(event) => setPurchasePrice(event.target.value)}
        />
        <button type='submit'>Add Stock</button>
      </form>
    </div>
  )
}

export default App
