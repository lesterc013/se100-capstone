import { useState } from 'react'
import StockForm from './components/StockForm'
import StockList from './components/StockList'
import './App.css'

function App() {
  const [stockSymbol, setStockSymbol] = useState('')
  const [quantity, setQuantity] = useState('')
  const [purchasePrice, setPurchasePrice] = useState('')
  const [stocks, setStocks] = useState([])

  const handleSubmit = async event => {
    console.log('Handle submit ran')
    event.preventDefault()
    // Actual url
    // const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&apikey=${
    //   import.meta.env.API_KEY
    // }`
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&apikey=${
      import.meta.env.VITE_API_KEY_DEMO
    }`
    // Make API call with the stockSymbol
    let jsonResponse = null
    try {
      const response = await fetch(url)
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
    setStockSymbol('')
    setQuantity('')
    setPurchasePrice('')
  }

  return (
    <div>
      <h1>Finance Dashboard</h1>
      <StockForm
        handleSubmit={handleSubmit}
        stockSymbol={stockSymbol}
        quantity={quantity}
        purchasePrice={purchasePrice}
        setStockSymbol={setStockSymbol}
        setQuantity={setQuantity}
        setPurchasePrice={setPurchasePrice}
      />
      <h2>Stock List</h2>
      {stocks.length === 0 ? (
        <div>No stocks added yet</div>
      ) : (
        stocks.map(stock => <StockList key={stock.stockSymbol} stock={stock} />)
      )}
    </div>
  )
}

export default App
