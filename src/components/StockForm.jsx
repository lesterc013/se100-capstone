const StockForm = props => {
  const {
    handleSubmit,
    stockSymbol,
    quantity,
    purchasePrice,
    setStockSymbol,
    setQuantity,
    setPurchasePrice,
  } = props

  return (
    <form onSubmit={handleSubmit}>
      <input
        name='stockSymbol'
        value={stockSymbol}
        type='text'
        onChange={event => setStockSymbol(event.target.value.toUpperCase())}
        placeholder='Stock Symbol'
      />
      <input
        name='quantity'
        value={quantity}
        type='number'
        onChange={event => setQuantity(event.target.value)}
        placeholder='Quantity'
      />
      <input
        name='purchasePrice'
        value={purchasePrice}
        type='number'
        onChange={event => setPurchasePrice(event.target.value)}
        placeholder='Purchase Price'
      />
      <button className='bg-sky-500 hover:bg-sky-700' type='submit'>
        Add Stock
      </button>
    </form>
  )
}

export default StockForm
