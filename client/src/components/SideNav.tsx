import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function SideNav({
  sideNavOpen,
  setSideNavOpen,
}: {
  sideNavOpen: boolean;
  setSideNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const expandSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };
  const asideRef = React.createRef<HTMLDivElement>();
  const openCloseRef = React.createRef<HTMLDivElement>();
  const [sideRefWidth, setSideRefWidth] = useState(
    asideRef.current?.clientWidth || 0
  );
  const [openCloseRefWidth, setOpenCloseRefWidth] = useState(
    openCloseRef.current?.clientWidth || 0
  );
  useEffect(() => {
    if (asideRef.current) setSideRefWidth(asideRef.current.clientWidth);
  }, [asideRef]);
  useEffect(() => {
    if (openCloseRef.current)
      setOpenCloseRefWidth(openCloseRef.current.clientWidth);
  }, [openCloseRef]);
  return (
    <div className={`grid relative w-auto h-full`}>
      <aside
        id="cta-button-sidebar"
        ref={asideRef}
        className="absolute top-0 h-full z-40 left-0 transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          {sideNavOpen ? (
            <div className="grid relative grid-flow-col w-full h-[20px] mb-[20px]">
              <div className="p-[7px] absolute self-center justify-self-end place-content-center hover:bg-gray-100 rounded-full cursor-pointer grid ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi w-5 h-5 bi-three-dots-vertical text-gray-500 transition duration-75 dark:text-gray-400"
                  viewBox="0 0 16 16"
                >
                  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                </svg>
              </div>
            </div>
          ) : (
            <></>
          )}
          <ul className="space-y-2 font-medium">
            <li>
              <NavLink
                to="dashboard"
                className={({ isActive, isPending }) =>
                  `flex ${
                    isActive
                      ? 'text-indigo-500 dark:text-indigo-900'
                      : isPending
                      ? 'text-gray-900 dark:text-white'
                      : ''
                  } items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700`
                }
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                {sideNavOpen ? <span className="ml-3">Dashboard</span> : <></>}
              </NavLink>
            </li>
            <li>
              <Link
                to=""
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                </svg>
                {sideNavOpen ? (
                  <span className="flex-1 ml-3 whitespace-nowrap">Kanban</span>
                ) : (
                  <></>
                )}
                {sideNavOpen ? (
                  <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                    Pro
                  </span>
                ) : (
                  <></>
                )}
              </Link>
            </li>
            <li>
              <NavLink
                to="inbox"
                className={({ isActive, isPending }) =>
                  `flex ${
                    isActive
                      ? 'text-indigo-500 dark:text-indigo-900'
                      : isPending
                      ? 'text-gray-900 dark:text-white'
                      : ''
                  } items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700`
                }
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                  <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                </svg>
                {sideNavOpen ? (
                  <span className="flex-1 ml-3 whitespace-nowrap">Inbox</span>
                ) : (
                  <></>
                )}
                {sideNavOpen ? (
                  <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    3
                  </span>
                ) : (
                  <span className="inline-flex items-center justify-center w-1 h-1 p-1 ml-1 text-sm font-medium text-blue-800 bg-blue-400 rounded-full dark:bg-blue-900 dark:text-blue-300"></span>
                )}
              </NavLink>
            </li>
            <li>
              <Link
                to="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                {sideNavOpen ? (
                  <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
                ) : (
                  <></>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <div
        style={{ width: sideRefWidth }}
        className={`outline-1 outline-slate-300/40 dark:outline-slate-900 outline z-20 h-full transition-transform -translate-x-full sm:translate-x-0`}
      ></div>
      <div
        ref={openCloseRef}
        style={{ right: `-${openCloseRefWidth / 2}px` }}
        className={`absolute z-30 outline-slate-300/40 text-gray-500 dark:text-gray-400 dark:bg-gray-800 dark:outline-slate-900 outline outline-1 grid w-[60px] h-[60px] top-1/2 bg-gray-50 rounded-full cursor-pointer`}
      >
        <div
          onClick={expandSideNav}
          className="grid w-fit h-fit content-center pl-[20px] place-self-center"
        >
          {sideNavOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi w-5 h-5 bi-caret-left-fill"
              viewBox="0 0 16 16"
            >
              <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi w-5 h-5 bi-caret-right-fill"
              viewBox="0 0 16 16"
            >
              <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
