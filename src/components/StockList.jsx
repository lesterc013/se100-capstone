import Stock from './Stock'

const StockList = ({ stockList }) => {
  return stockList.map(stock => <Stock key={stock.id} stockRecord={stock} />)
}

export default StockList
