import React, { useState } from "react";
import "../index.css";
import flixlogo from "!file-loader!./flixlogo.svg";
import { NavLink } from "react-router-dom";

export default function Nav() {
  const [menuActive, setMenuActive] = useState(true);

  const handleMenuClick = () => {
    menuActive ? setMenuActive(false) : setMenuActive(true);
  };

  const standardStyle =
    "block py-2 pr-4 pl-3 border-b border-gray-700 hover:bg-gray-50  md:border-0 md:p-0 md:pb-1 md:hover:text-white text-gray-400 hover:bg-gray-700 md:hover:text-white md:hover:bg-transparent ";

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

              <nav className="flex flex-col mt-4  md:flex-start md:flex-row md:space-x-8 md:mt-0 md:text-medium md:font-medium ">
                <NavLink
                  exact
                  to="/"
                  className={standardStyle}
                  style={({ isActive }) =>
                    isActive
                      ? {
                          color: "white",
                          textDecoration: "underline",
                          textUnderlineOffset: "3px",
                        }
                      : { color: "rgb(156 163 175)" }
                  }
                >
                  Home
                </NavLink>

                <NavLink
                  exact
                  to="/movies"
                  className={standardStyle}
                  style={({ isActive }) =>
                    isActive
                      ? {
                          color: "white",
                          textDecoration: "underline",
                          textUnderlineOffset: "3px",
                        }
                      : { color: "rgb(156 163 175)" }
                  }
                >
                  Movies
                </NavLink>

                <NavLink
                  exact
                  to="/tv"
                  className={standardStyle}
                  style={({ isActive }) =>
                    isActive
                      ? {
                          color: "white",
                          textDecoration: "underline",
                          textUnderlineOffset: "3px",
                        }
                      : { color: "rgb(156 163 175)" }
                  }
                >
                  TV Shows
                </NavLink>

                <NavLink
                  exact
                  to="/randomiser"
                  className={standardStyle}
                  style={({ isActive }) =>
                    isActive
                      ? {
                          color: "white",
                          textDecoration: "underline",
                          textUnderlineOffset: "3px",
                        }
                      : { color: "rgb(156 163 175)" }
                  }
                >
                  Randomiser
                </NavLink>
              </nav>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
