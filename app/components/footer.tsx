import React from "react";
import "../css/footer.css";
import smallIcon from "assets/icons/cgd-transparent.png";
import { socials } from "../siteSettings/socials.json";

const Footer = () => {
  return (
    <footer className="footer mt-auto flex lg:flex-row flex-col py-5 px-10 lg:px-14 xl:px-20 justify-between lg:items-center w-full">
      <div className="lg:basis-1/3">
        <div className="info-wrapper-footer">
          <div className="info">Concordia Game Development</div>
          <a
            href="https://www.google.com/maps/place/H+Building+Concordia+University/@45.4973223,-73.5816037,670m/data=!3m2!1e3!4b1!4m6!3m5!1s0x4cc91a6a51180f2b:0xc677cc2bed91570!8m2!3d45.4973223!4d-73.5790288!16s%2Fg%2F11clt8_gzw?entry=ttu&g_ep=EgoyMDI1MDgxMC4wIKXMDSoASAFQAw%3D%3D"
            className="address"
            target="_blank"
            rel="noreferrer"
          >
            1455 De Maisonneuve Blvd. West, Montreal, Quebec, Canada, H3G 1M8
          </a>
        </div>
        <div className="contact-wrapper-footer">
          <div className="contact">Contact Us</div>
          <a href="mailto:concordiagamedev@csu.qc.ca" className="email">
            concordiagamedev@csu.qc.ca
          </a>
        </div>
      </div>
      <div className="hidden md:flex md:justify-center md:items-center lg:basis-1/3">
        <img
          src={smallIcon}
          alt="cgd logo"
          className="hidden lg:block w-4/12 xl:w-3/12 3xl:w-2/12"
        />
      </div>

      {/* Refer to footer.css for styling in addition to these class names */}
      <div className="social-wrapper-footer m-4 lg:m-0 flex content-center gap-y-2 lg:gap-y-4 lg:basis-1/3">
        <div className="social">
          <div className="follow 2xl:float-right">Follow</div>
        </div>
        <div className="flex flex-row justify-between md:justify-center lg:justify-between 2xl:justify-end align-middle items-center">
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
                className="w-12 h-12 footer-svg md:mx-4 lg:mx-0 2xl:ml-8"
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
