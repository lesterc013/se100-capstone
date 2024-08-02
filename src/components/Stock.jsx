const Stock = ({ stockRecord }) => {
  const purchasePrice = stockRecord.purchasePrice
  const quantity = stockRecord.quantity
  const currentPrice = stockRecord.currentPrice
  const profitLoss = currentPrice * quantity - purchasePrice * quantity
  return (
    <div>
      <div>Symbol: {stockRecord.stockSymbol}</div>
      <div>Quantity: {quantity}</div>
      <div>Purchase Price: {purchasePrice}</div>
      <div>Current Price: {currentPrice}</div>
      <div>Profit/Loss: {profitLoss.toFixed(2)}</div>
    </div>
  )
}

export default Stock
