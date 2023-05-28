import { Outlet } from 'react-router-dom';
import SideNav from '../components/SideNav';
import { useState } from 'react';

export default function Home() {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  return (
    <div className="grid w-full h-full grid-flow-col grid-cols-[auto_1fr]">
      <div className="grid bg-gray-50 dark:bg-gray-500">
        <SideNav sideNavOpen={sideNavOpen} setSideNavOpen={setSideNavOpen} />
      </div>
      <div className="grid h-full">
        <Outlet />
      </div>
    </div>
  );
}
