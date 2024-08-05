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
    <form
      className='flex flex-col items-center md:flex-row md:justify-center'
      onSubmit={handleSubmit}
    >
      <div className='flex w-8/12 h-10 my-4 max-w-64'>
        <label htmlFor='stockSymbol'>Stock</label>
        <input
          name='stockSymbol'
          id='stockSymbol'
          value={stockSymbol}
          type='text'
          onChange={event => setStockSymbol(event.target.value.toUpperCase())}
          className='border-b-2 border-neutral-500'
        />
      </div>

      <div className='flex w-8/12 justify-between h-10 my-4 max-w-64'>
        <label htmlFor='quantity'>Quantity</label>
        <input
          name='quantity'
          id='quantity'
          value={quantity}
          type='number'
          onChange={event => setQuantity(event.target.value)}
          className='border-b-2 border-neutral-500'
        />
      </div>

      <div className='flex w-8/12 justify-between h-10 my-4 max-w-64'>
        <label htmlFor='purchasePrice'>Bought At</label>
        <input
          name='purchasePrice'
          id='purchasePrice'
          value={purchasePrice}
          type='number'
          onChange={event => setPurchasePrice(event.target.value)}
          className='border-b-2 border-neutral-500'
        />
      </div>
      <button
        className='border border-blue-600 text-blue-600 bg-transparent hover:bg-blue-600 hover:border-transparent hover:text-white active:bg-blue-700 min-w-16 rounded-full'
        type='submit'
      >
        Add
      </button>
    </form>
  )
}

export default StockForm
