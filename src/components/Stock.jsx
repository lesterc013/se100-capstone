const Stock = ({ stockRecord }) => {
  const purchasePrice = stockRecord.purchasePrice
  const quantity = stockRecord.quantity
  const currentPrice = stockRecord.currentPrice
  const profitLoss = currentPrice * quantity - purchasePrice * quantity
  return (
    <div className='flex flex-col items-center lg:w-full lg:justify-center mt-4'>
      <div className='min-w-48 lg:w-3/4 border-t border-black pt-1'>
        Symbol: {stockRecord.stockSymbol}
      </div>
      <div className='min-w-48 lg:w-3/4'>Quantity: {quantity}</div>
      <div className='min-w-48 lg:w-3/4'>Purchase Price: {purchasePrice}</div>
      <div className='min-w-48 lg:w-3/4'>Current Price: {currentPrice}</div>
      <div className='min-w-48 lg:w-3/4'>
        Profit/Loss: {profitLoss.toFixed(2)}
      </div>
    </div>
  )
}

export default Stock
