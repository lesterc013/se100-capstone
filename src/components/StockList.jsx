const StockList = ({ stock }) => {
  return (
    <div>
      <div>Symbol: {stock.stockSymbol}</div>
      <div>Quantity: {stock.quantity}</div>
      <div>Purchase Price: {stock.purchasePrice}</div>
      <div>Current Price: {stock.currentPrice}</div>
      <div>Profit/Loss: {stock.profitLoss}</div>
    </div>
  )
}

export default StockList
