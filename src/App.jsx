import { useCallback, useState } from 'react'
import StockForm from './components/StockForm'
import StockList from './components/StockList'
import './App.css'

function App() {
  const [stockSymbol, setStockSymbol] = useState('')
  const [quantity, setQuantity] = useState('')
  const [purchasePrice, setPurchasePrice] = useState('')
  const [stocks, setStocks] = useState([])

  // useCallback with empty array - means it will only be created on first render and then memoized to prevent recreation when component re-renders -- optimization
  const callApi = useCallback(async url => {
    try {
      const response = await fetch(url)
      const jsonResponse = await response.json()
      return jsonResponse
    } catch (error) {
      console.log(error.message)
      return
    }
  }, [])

  const handleSubmit = async event => {
    console.log('Handle submit ran')
    event.preventDefault()
    // Actual url
    // const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${
    //   import.meta.env.API_KEY
    // }`
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${
      import.meta.env.VITE_API_KEY_DEMO
    }`
    // Make API call with the stockSymbol
    const jsonResponse = await callApi(url)
    console.log(jsonResponse)
    // Extract out current price from API response
    const currentPrice = parseFloat(jsonResponse['Global Quote']['05. price'])
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
