import React, { useEffect, useState } from "react";
import "../index.css";
import flixlogo from "!file-loader!./flixlogo.svg";

const getWindowWidth = () => {
  const width = window.innerWidth;
  return width;
};

export default function Nav() {
  const [menuActive, setMenuActive] = useState(false);

  const [activeNav, setActiveNav] = useState("true");
  const [windowSize, setWindowSize] = useState(getWindowWidth());

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getWindowWidth);
    };
    if (windowSize > 766) {
      setMenuActive(true);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  const handleMenuClick = () => {
    if (menuActive) {
      setMenuActive(false);
    } else {
      setMenuActive(true);
    }
  };

  const standardStyle =
    "block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700";
  const activeStyle =
    "block py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700";

  const handleClick = (navlink) => {
    setActiveNav(navlink);
  };
  return (
    <div className="w-full border-b-[1px] border-gray-400">
      <nav className=" border-gray-200 px-2 sm:px-4 pt-2.5  md:pb-2.5 md:pt-1.5 mb-2 md:mb-0 mx-4 rounded   ">
        <div className="flex flex-wrap md:justify-start justify-between items-center mt-0.5 ">
          <div className="mr-8">
            <a href="/">
              <img className=" h-[30px] w-[50x]" src={flixlogo}></img>
            </a>
          </div>
          <div className="flex ">
            <button
              id="hamburgerMenu"
              type="button"
              onClick={handleMenuClick}
              className="inline-flex items-center p-2 text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 "
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          {menuActive && (
            <div className=" justify-between items-center w-full md:flex md:w-auto md:relative md:top-[5px]  ">
              <div className="relative mt-3 md:hidden">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"></div>
              </div>

              <ul className="flex flex-col mt-4  md:flex-start md:flex-row md:space-x-8 md:mt-0 md:text-medium md:font-medium ">
                <li>
                  <a
                    href="/"
                    onClick={() => handleClick("home")}
                    className={
                      activeNav === "home" ? activeStyle : standardStyle
                    }
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/movies"
                    onClick={() => handleClick("movies")}
                    className={
                      activeNav === "movies" ? activeStyle : standardStyle
                    }
                  >
                    Movies
                  </a>
                </li>
                <li>
                  <a
                    href="/tv"
                    onClick={() => handleClick("tvshows")}
                    className={
                      activeNav === "tvshows" ? activeStyle : standardStyle
                    }
                  >
                    TV Shows
                  </a>
                </li>
                <li>
                  <a
                    href="/randomiser"
                    onClick={() => handleClick("randomiser")}
                    className={
                      activeNav === "randomiser" ? activeStyle : standardStyle
                    }
                  >
                    Randomiser
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
