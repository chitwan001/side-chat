import { Moon, Sunny } from '@styled-icons/ionicons-sharp';
import { useUIMode } from '../hooks';
export default function ModeSwitcher() {
  const { mode, setModeByUser } = useUIMode();
  const changeUIMode = () => {
    if (mode === 'light') setModeByUser('dark');
    else setModeByUser('light');
  };
  return (
    <button
      id="theme-toggle"
      type="button"
      onClick={changeUIMode}
      className="dark:text-gray-200 hover:text-gray-400 dark:hover:text-gray-200 place-self-center place-content-center text-zinc-700 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
    >
      {mode === 'light' ? <Moon width={20} /> : <Sunny width={20} />}
    </button>
  );
}
