import { useCallback, useEffect, useState } from 'react'
import StockForm from './components/StockForm'
import StockList from './components/StockList'
import './App.css'

function AppTest() {
  const [stockSymbol, setStockSymbol] = useState('')
  const [quantity, setQuantity] = useState('')
  const [purchasePrice, setPurchasePrice] = useState('')
  const [stockList, setStockList] = useState([]) // To track each record entered by a user
  const [stockSymbolList, setStockSymbolList] = useState([]) // For triggering useEffect

  // useCallback with empty array - means it will only be created on first render and then memoized to prevent recreation when component re-renders -- optimization
  const getCurrentPrice = useCallback(async stockSymbol => {
    try {
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${
        import.meta.env.VITE_API_KEY_DEMO
      }`
      const response = await fetch(url)
      const jsonResponse = await response.json()
      const currentPrice = jsonResponse['Global Quote']['05. price']
      return currentPrice
    } catch (error) {
      console.log(error.message)
      return
    }
  }, [])

  // Biggest hurdle - cannot set as dependency something that you intend to change state within useEffect. Will cause infinite loop. This was because I tried to setStockList while using stockList as a dependency. What solved the issue was to have a stockSymbolList to track someone adding stocks, and then using that to trigger useEffect to setStockList
  useEffect(() => {
    console.log('useEffect run')
    const updateCurrentPrice = async () => {
      for (const symbol of stockSymbolList) {
        const currentPrice = await getCurrentPrice(symbol)
        setStockList(prevList =>
          prevList.map(record =>
            record.stockSymbol === symbol ? { ...record, currentPrice } : record
          )
        )
      }
    }
    updateCurrentPrice()
  }, [stockSymbolList, getCurrentPrice])

  const handleSubmit = async event => {
    event.preventDefault()
    const currentPrice = await getCurrentPrice(stockSymbol)
    if (!currentPrice) {
      console.log('Invalid symbol')
    } else {
      !stockSymbolList.includes(stockSymbol) &&
        setStockSymbolList(stockSymbolList.concat(stockSymbol))
      setStockList(
        stockList.concat({
          id: stockList.length,
          stockSymbol,
          quantity,
          purchasePrice,
          currentPrice,
        })
      )
    }
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
      {stockList.length === 0 ? (
        <div>No stocks added</div>
      ) : (
        stockList.map(stock => (
          <StockList key={stock.stockSymbol} stockRecord={stock} />
        ))
      )}
    </div>
  )
}

export default AppTest
