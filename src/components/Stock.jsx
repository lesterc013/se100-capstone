const Stock = ({ stockRecord }) => {
  const purchasePrice = stockRecord.purchasePrice
  const quantity = stockRecord.quantity
  const currentPrice = stockRecord.currentPrice
  const profitLoss = currentPrice * quantity - purchasePrice * quantity
  return (
    <div className='flex flex-col items-center lg:w-full lg:justify-center mt-4 font-rubik dark:text-neutral-300'>
      <div className='min-w-48 lg:w-3/4 border-t border-black dark:border-white pt-1'>
        Symbol: {stockRecord.stockSymbol}
      </div>
      <div className='min-w-48 lg:w-3/4'>Quantity: {quantity}</div>
      <div className='min-w-48 lg:w-3/4'>Purchase Price: {purchasePrice}</div>
      <div className='min-w-48 lg:w-3/4'>Current Price: {currentPrice}</div>
      {profitLoss >= 0 ? (
        <div className='min-w-48 lg:w-3/4 text-green-600'>
          Profit/Loss: {profitLoss.toFixed(2)}
        </div>
      ) : (
        <div className='min-w-48 lg:w-3/4 text-red-600'>
          Profit/Loss: {profitLoss.toFixed(2)}
        </div>
      )}
    </div>
  )
}

export default Stock
