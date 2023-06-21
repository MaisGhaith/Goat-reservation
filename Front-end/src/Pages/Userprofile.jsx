import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FiLogOut } from "react-icons/fi";
import { AiFillHome } from "react-icons/ai";
import { IoHelpCircleOutline } from "react-icons/io5";


import { useState } from "react";
import Profilehome from "../Components/homepage/profilehome";
import UserReservation from "../Components/homepage/UserReservations";
import { useNavigate } from "react-router-dom";

export default function Userprofile() {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("home");

  const renderContent = () => {
    if (activeLink === "home") {
      return (
        <>
          <Profilehome />
          <UserReservation />
        </>
      );
    } else if (activeLink === "profile") {
      return <Profilesettings goBack={() => handleLinkClick("home")} />;
    }
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <>
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>
      <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      style={{ backgroundColor: "#161616", color: "white" }}
      aria-label="Sidebar"
    >
        <div className="h-full px-2 py-4 overflow-y-auto">
        <Link to="/" className="self-center text-2xl font-semibold whitespace-nowrap">
        🐐 GOAT Field
      </Link>
          <br/><br/>
          <ul className="space-y-2 font-medium">
          <li>
              <Link
                to="/"
                className="flex items-center p-2 rounded-lg hover:bg-black -100 dark:hover:bg-black-700"
                onClick={() => handleLinkClick("home")}
              >
                <AiFillHome className="w-5 h-5" style={{ color: "#54B435" }} />
                <span className="ml-3">Home</span>
              </Link>
            </li>
            <li>
            <a
            to="/"
              className="flex items-center p-2 rounded-lg hover:bg-black -100 dark:hover:bg-black-700"
              onClick={() => handleLinkClick("home")}
            >
              <FaUser className="w-5 h-5" style={{ color: "#54B435" }} />
              <span className="ml-3">Profile</span>
            </a>
          </li>
          <li>
          <Link
            to = "/FAQs"
            className="flex items-center p-2 rounded-lg hover:bg-black -100 dark:hover:bg-black-700"
            onClick={() => handleLinkClick("home")}
          >
            <IoHelpCircleOutline className="w-6 h-6" style={{ color: "#54B435" }} />
            <span className="ml-3">Help</span>
            </Link>
        </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 rounded-lg hover:bg-black -100 dark:hover:bg-black-700"
              >
                <FiLogOut className="w-7 h-7" style={{ color: "#54B435" }} />
                <button
                  className="ml-2 whitespace-nowrap"
                  onClick={() => {
                    navigate("/");
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Log out
                </button>
              </a>
            </li>
          </ul>
        </div>
      </aside>
      <div className="p-4 sm:ml-64">{renderContent()}</div>
      <br /> <br /> <br /> <br /> <br />v <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />v
    </>
  );
}
