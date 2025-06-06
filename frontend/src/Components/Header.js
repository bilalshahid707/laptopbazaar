import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
export const Header = () => {
  const isLoggedIn = useSelector((state) => state.User.LoggedIn);
  const user = useSelector((state) => state.User.User);
  
  const [openMenu, setOpenMenu] = useState(false);
  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const [dropdown,setDropdown] = useState(false)

  const logOut = ()=>{
    Cookies.remove('jwt')
    location.assign('/')
  }

  return (
    <header className="w-full shadow-xl bg-white">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="https://laptopbazaar.netlify.app"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="../assets/logo-header.png"
              className="h-12"
              alt="Laptop Bazaar Logo"
            />
            <span className="self-center text-base md:tertiary-heading text-blue font-semibold whitespace-nowrap">
              Laptop Bazaar
            </span>
          </a>
          <div className="relative hidden md:block min-w-96 w-1/2">
            <form>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-4 h-10 text-sm text-blue border border-gray-300 rounded-lg bg-whiteAccent focus:border-blue outline-none "
                placeholder="Search for laptops"
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />
              <div className="absolute inset-y-0 right-4 cursor-pointer flex items-center ps-3 ">
                <svg
                  className="w-4 h-4 text-blue"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only cursor-pointer">Search icon</span>
              </div>
            </form>
          </div>

          {/* ************** Navigation buttons on mobile *************** */}
          <div className="flex md:order-2 gap-3">
            <button
              onClick={handleMenu}
              type="button"
              data-collapse-toggle="navbar-search"
              aria-controls="navbar-search"
              aria-expanded="false"
              className="md:hidden text-blue "
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
            <button
              onClick={handleMenu}
              data-collapse-toggle="navbar-search"
              type="button"
              className="md:hidden text-blue"
              aria-controls="navbar-search"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          {/* **************** Mobile Search Bar **************** */}
          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:h-0  ${
              openMenu ? "hidden opacity-0 h-0" : "opacity-1 h-48"
            } transition-all z-10`}
            id="navbar-search"
          >
            <div className="relative mt-3 md:hidden">
              <div className="absolute inset-y-0 end-4 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="w-full p-2 ps-4 text-sm text-blue border border-gray-300 rounded-lg bg-whiteAccent focus:border-blue outline-none"
                placeholder="Search for laptops"
              />
            </div>
            {isLoggedIn ? (
              <div className="relative">
              <div onClick={()=>{setDropdown(!dropdown)}} className={`cursor-pointer cta-buttons custom-flex w-full gap-4 flex-col p-2 rounded-lg md:flex-row hover:bg-whiteAccent`}>
                <div className="h-10 w-10 rounded-full bg-black"></div>
                <div className="text-base capitalize">{user?.name}</div>
              </div>
              <div className={`absolute dropdown mt-2 bg-whiteAccent h-max w-48 border-none ${dropdown?'block':'hidden'}`}>
                <ul className="dropdownlist">
                  <li className="dropdown-item p-2 hover:bg-white rounded-lg"><Link onClick={logOut}>Log Out</Link></li>
                  <li className="dropdown-item p-2 hover:bg-white rounded-lg"><Link to={user?.role==='user'?'/new-supplier':`/${user?.slug}`}>{user?.role==='user'?'Become Supplier':'See Profile'}</Link></li>
                  {user?.role==='supplier' || user?.role==='admin'?<li className="dropdown-item p-2 hover:bg-white rounded-lg"><Link to={'/dashboard/settings'}>Settings</Link></li>:''}
                </ul>
              </div>
              </div>
            ) : (
              <div className="cta-buttons flex w-full gap-4 flex-col p-4 pr-0 pl-0 md:p-0 md:flex-row">
                <Link to={"/login"} className="btn-filled text-center">
                  Log in
                </Link>
                <Link to={"/signup"} className="btn-outlined">
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
        <nav className="bg-blue">
          <ul className="custom-flex gap-8 p-3 text-base text-white">
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/all-products'}>All Laptops</Link></li>
            <li><Link>About us</Link></li>
          </ul>
        </nav>
    </header>
  );
};

export default Header;
