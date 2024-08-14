const MainTitle = () => {
  return (
    <div className='flex w-full justify-center'>
      <div className='flex justify-center lg:w-3/4 lg:justify-start'>
        <img
          src='../src/assets/money-icon.svg'
          alt='money-icon'
          className='h-8 w-8'
        ></img>
        <h1 className='font-rubik text-xl font-bold dark:text-neutral-300 px-4'>
          Your Financial Overview
        </h1>
        <img
          src='../src/assets/money-icon.svg'
          alt='money-icon'
          className='h-8 w-8'
        ></img>
      </div>
    </div>
  )
}

export default MainTitle
