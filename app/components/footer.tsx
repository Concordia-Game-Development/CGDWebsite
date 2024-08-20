import React from "react";
import "../css/footer.css";
import smallIcon from "assets/icons/cgd-transparent.png";
import { socials } from "../siteSettings/socials.json";

const Footer = () => {
  return (
    <footer className="footer flex lg:flex-row flex-col py-5 px-10 lg:px-14 xl:px-20 justify-between lg:items-center w-full">
      <div className="">
        <div className="info-wrapper-footer">
          <div className="info">Concordia Game Development</div>
          <a
            href="https://goo.gl/maps/22J1SBAVLrBCwsHk7"
            className="address"
            target="_blank"
          >
            2020 Mackay St, Unit P-105, Montreal, QC H3G 2M2
          </a>
        </div>
        <div className="contact-wrapper-footer">
          <div className="contact">Contact Us</div>
          <a href="mailto:game.development@concordia.ca" className="email">
            game.development@concordia.ca
          </a>
        </div>
      </div>
      <div className="hidden md:flex md:justify-center md:items-center">
        <img
          src={smallIcon}
          alt="cgd logo"
          className="hidden lg:block w-4/12 xl:w-3/12"
        />
      </div>

      {/* Refer to footer.css for styling in addition to these class names */}
      <div className="social-wrapper-footer flex content-center gap-y-2 lg:gap-y-4">
        <div className="social">
          <div className="follow">Follow</div>
        </div>
        <div className="flex flex-row justify-between md:justify-center lg:justify-between align-middle items-center">
          {/* The icons are taken from socials.json in siteSettings */}
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target={social.target}
              className="min-h-10 min-w-10"
            >
              <img
                src={social.img}
                alt={social.alt}
                className="w-12 h-12 footer-svg md:mx-4 lg:mx-0"
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
