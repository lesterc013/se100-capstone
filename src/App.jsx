import { useCallback, useEffect, useState } from 'react'
import StockForm from './components/StockForm'
import StockList from './components/StockList'
import { StockListContext } from './components/StockListContext'
import MainTitle from './components/MainTitle'
import SubTitle from './components/SubTitle'

function AppTest() {
  const [stockSymbol, setStockSymbol] = useState('')
  const [quantity, setQuantity] = useState('')
  const [purchasePrice, setPurchasePrice] = useState('')
  const [stockList, setStockList] = useState([]) // To track each record entered by a user
  const [stockSymbolList, setStockSymbolList] = useState([]) // For triggering useEffect
  const [darkMode, setDarkMode] = useState(false)

  // API call: useCallback with empty array - means it will only be created on first render and then memoized to prevent recreation when component re-renders -- optimization
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

  // useEffect: Biggest hurdle - cannot set as dependency something that you intend to change state within useEffect. Will cause infinite loop. This was because I tried to setStockList while using stockList as a dependency. What solved the issue was to have a stockSymbolList to track someone adding new stocks, and then using that to trigger useEffect to setStockList.
  // BUT this also presented a case where if i add an existing stock, then useEffect wont run cos we wont add this existing symbol to stockSymbolList. Hence, the fix is to track the stockList.length where if it changes i.e. someone added a stock, useEffect will run
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
  }, [stockList.length, stockSymbolList, getCurrentPrice])

  // handleSubmit event handler
  const handleSubmit = async event => {
    event.preventDefault()
    const currentPrice = await getCurrentPrice(stockSymbol)
    // To handle invalid stock symbol; currentPrice = undefined when invalid
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
    <div className={darkMode ? 'dark' : ''}>
      <div className='h-screen bg-eggshell dark:bg-neutral-900'>
        <div className='flex flex-col pt-28 h-fit justify-start lg:items-start'>
          <MainTitle />
          <StockForm
            handleSubmit={handleSubmit}
            stockSymbol={stockSymbol}
            quantity={quantity}
            purchasePrice={purchasePrice}
            setStockSymbol={setStockSymbol}
            setQuantity={setQuantity}
            setPurchasePrice={setPurchasePrice}
          />
          <SubTitle />
          {stockList.length === 0 ? (
            <div className='flex flex-col items-center lg:w-full lg:justify-center'>
              <p className='lg:min-w-48 lg:w-3/4 dark:text-neutral-300'>
                No stocks added
              </p>
            </div>
          ) : (
            <StockListContext.Provider value={stockList}>
              <StockList />
            </StockListContext.Provider>
          )}
        </div>
      </div>
      <button
        className='absolute top-6 right-6 bg-transparent hover:bg-neutral-500 dark:bg-neutral-500  dark:hover:bg-eggshell rounded-full'
        onClick={() => setDarkMode(!darkMode)}
      >
        <img
          src='./src/assets/dark-theme.svg'
          alt='dark-light-mode-selector'
        ></img>
      </button>
    </div>
  )
}

export default AppTest
