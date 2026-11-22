import "app/css/navbar.css";
import { Link } from "@remix-run/react";
import CGDLogo from "assets/icons/cgd-transparent.png";
import merchicon from "assets/icons/merch-icon.svg";
import abouticon from "assets/icons/abtus-nav.svg";
import eventsicon from "assets/icons/event-icon.svg";
import sponsorsicon from "assets/icons/sponsor-icon.svg";
import ig from "assets/icons/IG.svg";
import fb from "assets/icons/facebook.svg";
import itch from "assets/icons/itch.svg";
import ln from "assets/icons/linked.svg";
import linktree from "assets/icons/linktree.svg";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Tickets from "assets/icons/Tickets.svg"
import controllericon from "../components/getStartedPage/controller.png"

const Navbar = () => {
  // page-links and social-menu
  let Links = [
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
    {
      name: "Get started in Game Dev",
      link: "/getStartedPage",
      img: controllericon,
      alt: "icon that brings you to the gamedev get started page",
    },
    {
      name: "Merch",
      link: "/merch",
      img: merchicon,
      alt: "icon that brings you to the gamedev merch page",
    },
  ];
  let socials = [
    // {
    //   name: "Instagram",
    //   class: "ig-icon",
    //   href: "https://www.instagram.com/concordiagamedev/?hl=en",
    //   target: "_blank",
    //   img: ig,
    //   alt: "ig icon that brings you to game dev concordia instagram",
    // },
    // {
    //   name: "Facebook",
    //   class: "fb-icon",
    //   href: "https://www.facebook.com/concordiagamedev/",
    //   target: "_blank",
    //   img: fb,
    //   alt: "fb icon that brings you to game dev concordia facebook",
    // },
    // {
    //   name: "Itch.io",
    //   class: "itch-icon",
    //   href: "https://concordiagamedev.itch.io/",
    //   target: "_blank",
    //   img: itch,
    //   alt: "itch icon that brings you to game dev concordia itch.io",
    // },
    // {
    //   name: "LinkedIn",
    //   class: "linked-icon",
    //   href: "https://www.linkedin.com/company/concordia-game-development/?original_referer=",
    //   target: "_blank",
    //   img: ln,
    //   alt: "ln icon that brings you to game dev concordia linkedin",
    // },
    {
      name: "LinkTree",
      class: "linktree-icon",
      href: "https://linktr.ee/concordiagamedev",
      target: "_blank",
      img: linktree,
      alt: "ln icon that brings you to game dev concordia linktree",
    },
  ];
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <div
      className={`navbar shadow-md fixed top-0 left-0 w-full z-20 backdrop-blur-md ${open ? "menu-open" : ""
        }`}
    >
      <div className="w-full max-w-[1440px] mx-auto lg:flex lg:items-center lg:justify-between lg:px-4">
        {/* logo */}
        <div className="flex flex-row justify-between lg:flex-none lg:min-w-[88px]">
          <Link to="/" onClick={closeMenu} aria-label="Home" title="Home">
            <img
              src={CGDLogo}
              alt="Concordia-Game-Dev club logo"
              className="cgd-logo h-16 w-16 p-3"
            />
          </Link>
          {/* menu logos */}
          <div
            onClick={toggleMenu}
            className="hamburger flex self-center mr-4 lg:hidden"
          >
            {open ? (
              <X className="w-10 h-10 p-2" />
            ) : (
              <Menu className="w-10 h-10 p-2" />
            )}
          </div>
        </div>
        {/* nav-links */}
        <ul
          className={`page-links flex-col lg:flex-row justify-center gap-3 lg:gap-1 xl:gap-2 mx-8 sm:mx-12 lg:mx-4 lg:flex lg:flex-1 hidden ${open ? "menu-open" : ""
            }`}
        >
          {Links.map((link) => (
            <li key={`${link.name}-${link.link}`}>
              <Link
                to={link.link}
                onClick={closeMenu}
                className="nav border border-light-pink lg:border-transparent"
              >
                <img
                  src={link.img}
                  alt={link.alt}
                  className={`svg-icon ${"iconClass" in link ? link.iconClass : ""}`}
                />
                <h4 className="nav-item">
                  <span>{link.name}</span>
                </h4>
              </Link>
            </li>
          ))}
        </ul>
        {/* socials-links */}
        <div
          className={`socials-menu flex-shrink-0 xl:items-center flex-row justify-center gap-x-5 xl:justify-end my-6 hidden xl:flex xl:min-w-[88px] xl:pl-4 ${open ? "menu-open" : ""
            }`}
        >
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target={social.target}
              onClick={closeMenu}
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
