import React from "react";
import "../css/footer.css";
import bannerLogo from "assets/icons/CGD-Dark-Banner.png";

const Footer = () => {
  return (
    <footer className="footer flex lg:flex-row flex-col py-5 px-10 lg:px-14 justify-between lg:items-center w-full">
      <div>
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
      <div className="hidden">
        <img src={bannerLogo} alt="banner logo" className="w-1/3 rounded-lg" />
      </div>
      <div className="social-wrapper-footer">
        <div className="social">Follow</div>
        <a
          href="https://www.instagram.com/concordiagamedev/?hl=en"
          className="ig"
          target="_blank"
        >
          Instagram
        </a>
        <a
          href="https://www.facebook.com/concordiagamedev/"
          target="_blank"
          className="fb"
        >
          Facebook
        </a>
        <a
          href="https://concordiagamedev.itch.io/"
          className="itch"
          target="_blank"
        >
          Itch
        </a>
        <a
          href="https://www.linkedin.com/company/concordia-game-development/?original_referer="
          className="linked"
          target="_blank"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
};

export default Footer;
