/* eslint-disable react/prop-types */
import { useState } from 'react'
import './App.css'

function App() {
  const [stockSymbol, setStockSymbol] = useState('')
  const [quantity, setQuantity] = useState('')
  const [purchasePrice, setPurchasePrice] = useState('')
  const [stocks, setStocks] = useState([])

  const handleSubmit = async (event) => {
    console.log('Handle submit ran')
    event.preventDefault()
    // const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&apikey=${
    //   import.meta.env.API_KEY
    // }`
    const demoUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=${
      import.meta.env.VITE_API_KEY_DEMO
    }`
    // Make API call with the stockSymbol
    let jsonResponse = null
    try {
      const response = await fetch(demoUrl)
      jsonResponse = await response.json()
    } catch (error) {
      console.log(error.message)
      return
    }
    // Extract out current price from API response
    const lastRefreshed = jsonResponse['Meta Data']['3. Last Refreshed']
    const currentPrice = parseFloat(
      jsonResponse['Time Series (Daily)'][lastRefreshed]['4. close']
    )
    // Calculate Profit/Loss
    const profitLoss = currentPrice * quantity - purchasePrice * quantity
    // Store state of this stock's info into stocks
    const newStock = {
      stockSymbol,
      quantity,
      purchasePrice,
      profitLoss,
      currentPrice,
    }
    setStocks(stocks.concat(newStock))
    console.log(stocks)
  }

  return (
    <div>
      {console.log('Rendered')}
      <StockForm
        handleSubmit={handleSubmit}
        stockSymbol={stockSymbol}
        quantity={quantity}
        purchasePrice={purchasePrice}
        setStockSymbol={setStockSymbol}
        setQuantity={setQuantity}
        setPurchasePrice={setPurchasePrice}
      />
      {console.log(stocks)}
    </div>
  )
}

const StockForm = (props) => {
  const {
    handleSubmit,
    stockSymbol,
    quantity,
    purchasePrice,
    setStockSymbol,
    setQuantity,
    setPurchasePrice,
  } = props

  return (
    <form onSubmit={handleSubmit}>
      <input
        name='stockSymbol'
        value={stockSymbol}
        type='text'
        onChange={(event) => setStockSymbol(event.target.value)}
        placeholder='Stock Symbol'
      />
      <input
        name='quantity'
        value={quantity}
        type='number'
        onChange={(event) => setQuantity(event.target.value)}
        placeholder='Quantity'
      />
      <input
        name='purchasePrice'
        value={purchasePrice}
        type='number'
        onChange={(event) => setPurchasePrice(event.target.value)}
        placeholder='Purchase Price'
      />
      <button type='submit'>Add Stock</button>
    </form>
  )
}

export default App
