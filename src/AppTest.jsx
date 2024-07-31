import { useCallback, useEffect, useState } from 'react'
import StockForm from './components/StockForm'
import StockList from './components/StockList'
import './App.css'

function AppTest() {
  const [stockSymbol, setStockSymbol] = useState('')
  const [quantity, setQuantity] = useState('')
  const [purchasePrice, setPurchasePrice] = useState('')
  const [stockList, setStockList] = useState([])

  // useCallback with empty array - means it will only be created on first render and then memoized to prevent recreation when component re-renders -- optimization
  const getCurrentPrice = useCallback(async stockSymbol => {
    try {
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${thisStockSymbol}&apikey=${
        import.meta.env.VITE_API_KEY_DEMO
      }`
      const response = await fetch(url)
      const jsonResponse = await response.json()
      const currentPrice = jsonResponse['Global Quote']['05. price']
    } catch (error) {
      console.log(error.message)
      return
    }
  }, [])

  const handleSubmit = async event => {
    event.preventDefault()
    // !stockList.includes(stockSymbol) &&
    //   setStockList(stockList.concat(stockSymbol))
    setStockSymbol('')
    setQuantity('')
    setPurchasePrice('')
    !stockList.find(stock => stock.symbol === stockSymbol) &&
      setStockList(
        stockList.concat({
          symbol: stockSymbol,
          currentPrice: null,
        })
      )
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
      {console.log(stockList)}
    </div>
  )
}

export default AppTest
