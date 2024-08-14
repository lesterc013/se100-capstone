import darkThemeIcon from '../assets/dark-theme.svg'

const DarkThemeSelector = ({ handleDarkMode }) => {
  return (
    <button
      className='absolute top-6 right-6 bg-transparent hover:bg-neutral-500 dark:bg-neutral-500  dark:hover:bg-eggshell rounded-full'
      onClick={handleDarkMode}
    >
      <img src={darkThemeIcon} alt='dark-light-mode-selector'></img>
    </button>
  )
}

export default DarkThemeSelector
