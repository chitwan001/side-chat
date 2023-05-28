import { useAuth } from '../context/auth-context';
import ModeSwitcher from './ModeSwitcher';
import Settings from './Settings';
import UserAvatar from './UserAvatar';

export default function Header() {
  const { user } = useAuth();
  return (
    <nav className="sticky top-0 grid grid-flow-col left-0 h-[70px] z-50 bg-gray-50 dark:bg-gray-800 outline outline-1 outline-slate-300/40 dark:outline-slate-900 w-full">
      <div className="grid place-self-center text-2xl text-zinc-700 dark:text-gray-200">
        Side-Chat
      </div>
      <div className="grid gap-[130px] grid-flow-col absolute self-center justify-self-end mr-[30px]">
        <ModeSwitcher />
        {user ? <UserAvatar /> : <></>}
      </div>
    </nav>
  );
}
