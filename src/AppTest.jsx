import { useCallback, useEffect, useState } from 'react'
import StockForm from './components/StockForm'
import StockList from './components/StockList'
import './App.css'

function AppTest() {
  const [stockSymbol, setStockSymbol] = useState('')
  const [quantity, setQuantity] = useState('')
  const [purchasePrice, setPurchasePrice] = useState('')
  const [stockSymbolList, setStockSymbolList] = useState([]) // For triggering useEffect
  const [currentPrice, setCurrentPrice] = useState([]) // For tracking a specific stock's currentPrice
  const [stockList, setStockList] = useState([]) // To track each record entered by a user

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

  // Everytime a new symbol is added to stockSymbolList i.e. stockSymbolList changes, useEffect triggers - which will loop through all the stock symbols, and make API call to get its latest price. All the latest prices are updated in currentPrice state variable
  useEffect(() => {
    const updateCurrentPrice = async () => {
      const updatedCurrentPrice = []
      for (const symbol of stockSymbolList) {
        const currentPrice = await getCurrentPrice(symbol)
        const newStock = {
          symbol,
          currentPrice,
        }
        updatedCurrentPrice.push(newStock)
      }
      setCurrentPrice(updatedCurrentPrice)
    }
    updateCurrentPrice()
  }, [stockSymbolList, getCurrentPrice])

  const handleSubmit = async event => {
    event.preventDefault()
    !stockSymbolList.includes(stockSymbol) &&
      setStockSymbolList(stockSymbolList.concat(stockSymbol))
    setStockList(
      stockList.concat({
        stockSymbol,
        quantity,
        purchasePrice,
      })
    )
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
      {/* {console.log(currentPrice)}
      {currentPrice.length === 0 || stockList.length === 0 ? (
        <div>No stocks added</div>
      ) : (
        stockList.map(stock => (
          <StockList
            key={stock.stockSymbol}
            stockRecord={stock}
            currentPrice={
              currentPrice.find(obj => obj.symbol === stock.stockSymbol)
                .currentPrice
            }
          />
        ))
      )} */}
    </div>
  )
}

export default AppTest
