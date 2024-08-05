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
      className='flex flex-col items-center lg:flex-row lg:justify-center'
      onSubmit={handleSubmit}
    >
      <div className='relative flex justify-center w-8/12 h-10 my-4 max-w-64'>
        <input
          className='peer border-b border-neutral-500 placeholder-transparent focus:outline-none'
          name='stockSymbol'
          id='stockSymbol'
          value={stockSymbol}
          type='text'
          onChange={event => setStockSymbol(event.target.value.toUpperCase())}
          placeholder='Stock'
          autoComplete='off'
        />
        <label
          className='absolute left-9 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm transition-all'
          htmlFor='stockSymbol'
        >
          Stock
        </label>
      </div>

      <div className='relative flex justify-center w-8/12 h-10 my-4 max-w-64'>
        <input
          className='peer border-b border-neutral-500 placeholder-transparent focus:outline-none'
          name='quantity'
          id='quantity'
          value={quantity}
          type='number'
          onChange={event => setQuantity(event.target.value)}
          placeholder='Quantity'
          autoComplete='off'
        />
        <label
          className='absolute left-9 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm transition-all'
          htmlFor='quantity'
        >
          Quantity
        </label>
      </div>

      <div className='relative flex justify-center w-8/12 h-10 my-4 max-w-64'>
        <input
          className='peer border-b border-neutral-500 placeholder-transparent focus:outline-none'
          name='purchasePrice'
          id='purchasePrice'
          value={purchasePrice}
          type='number'
          onChange={event => setPurchasePrice(event.target.value)}
          placeholder='Purchase Price'
          autoComplete='off'
        />
        <label
          className='absolute left-9 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm transition-all'
          htmlFor='purchasePrice'
        >
          Bought At
        </label>
      </div>
      <button
        className='border border-blue-600 text-blue-600 bg-transparent hover:bg-blue-600 hover:border-transparent hover:text-white active:bg-blue-700 min-w-16 rounded-full my-4'
        type='submit'
      >
        Add
      </button>
    </form>
  )
}

export default StockForm
