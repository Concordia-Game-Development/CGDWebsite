import "app/css/navbar.css";
import { Link } from "@remix-run/react";
import CGDLogo from "assets/icons/cgd-transparent.png";
import homeicon from "assets/icons/home-icon.svg";
import abouticon from "assets/icons/abtus-nav.svg";
import eventsicon from "assets/icons/event-icon.svg";
import sponsorsicon from "assets/icons/sponsor-icon.svg";
import ig from "assets/icons/IG.svg";
import fb from "assets/icons/facebook.svg";
import itch from "assets/icons/itch.svg";
import ln from "assets/icons/linked.svg";
import { RiMenuFill } from "@react-icons/all-files/ri/RiMenuFill.js";
import { RiCloseFill } from "@react-icons/all-files/ri/RiCloseFill.js";
import { useState } from "react";

const Navbar = () => {
  // page-links and social-menu
  let Links = [
    {
      name: "Home",
      link: "/",
      img: homeicon,
      alt: "home icon that brings you back to gamedev main page",
    },
    {
      name: "About",
      link: "/about",
      img: abouticon,
      alt: "icon that brings you to gamedev about us page",
    },
    {
      name: "Events",
      link: "/events",
      img: eventsicon,
      alt: "icon that brings you to gamedev upcoming events page",
    },
    {
      name: "Sponsors",
      link: "/sponsor",
      img: sponsorsicon,
      alt: "icon that brings you to gamedev sponsor page",
    },
  ];
  let socials = [
    {
      name: "Instagram",
      class: "ig-icon",
      href: "https://www.instagram.com/concordiagamedev/?hl=en",
      target: "_blank",
      img: ig,
      alt: "ig icon that brings you to game dev concordia instagram",
    },
    {
      name: "Facebook",
      class: "fb-icon",
      href: "https://www.facebook.com/concordiagamedev/",
      target: "_blank",
      img: fb,
      alt: "fb icon that brings you to game dev concordia facebook",
    },
    {
      name: "Itch.io",
      class: "itch-icon",
      href: "https://concordiagamedev.itch.io/",
      target: "_blank",
      img: itch,
      alt: "itch icon that brings you to game dev concordia itch.io",
    },
    {
      name: "LinkedIn",
      class: "linked-icon",
      href: "https://www.linkedin.com/company/concordia-game-development/?original_referer=",
      target: "_blank",
      img: ln,
      alt: "ln icon that brings you to game dev concordia linkedin",
    },
  ];
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <div
      className={`navbar shadow-md fixed top-0 left-0 w-full z-20 backdrop-blur-md ${
        open ? "menu-open" : ""
      }`}
    >
      <div className=" md:flex md:justify-between md:items-center w-full">
        {/* logo */}
        <div className="flex-shrink-0 flex flex-row justify-between">
          <a href="/">
            <img
              src={CGDLogo}
              alt="Concordia-Game-Dev club logo"
              className="cgd-logo h-16 w-16 p-3"
            />
          </a>
          {/* menu logos */}
          <div
            onClick={toggleMenu}
            className="hamburger flex self-center mr-4 md:hidden"
          >
            {open ? (
              <RiCloseFill className="w-10 h-10 p-2" />
            ) : (
              <RiMenuFill className="w-10 h-10 p-2" />
            )}
          </div>
        </div>
        {/* nav-links */}
        <ul
          className={`page-links flex-col md:flex-row justify-center gap-3 md:gap-2 mx-16 md:mx-1 md:flex hidden ${
            open ? "menu-open" : ""
          }`}
        >
          {Links.map((link) => (
            <li key={link.name}>
              <Link
                to={link.link}
                className="nav border border-light-pink md:border-transparent"
              >
                <img src={link.img} alt={link.alt} className="svg-icon" />
                <h4 className="nav-item">{link.name}</h4>
              </Link>
            </li>
          ))}
        </ul>
        {/* socials-links */}
        <div
          className={`socials-menu flex-shrink-0 md:items-center flex-row justify-center my-6 hidden md:flex ${
            open ? "menu-open" : ""
          }`}
        >
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target={social.target}
              className={`nav-social-icons ${social.class} svg`}
            >
              <img src={social.img} alt={social.alt} className="menu-svg"></img>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
