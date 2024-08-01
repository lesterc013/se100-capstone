import { useContext } from 'react'
import { StockListContext } from './StockListContext'
import Stock from './Stock'

const StockList = () => {
  const stockList = useContext(StockListContext)
  return stockList.map(stock => <Stock key={stock.id} stockRecord={stock} />)
}

export default StockList
