import cgdpink from "assets/icons/cgd-transp-pink.png";
import sponsorpacklm from "assets/pics/light mode-2.png";
import cc2mtl from "assets/icons/cc2-mtl.png";
import cc2 from "assets/icons/cc2.png";
import ubi from "assets/icons/ubisoft.png";
import dotbigbang from "assets/icons/dot-big-bang.jpg";
import ieee from "assets/icons/ieee-concordia..jpg";
import "app/css/sponsors.css";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Sponsors | CGD" },
    { name: "description", content: "Welcome to Concordia Game Dev Club!" },
  ];
};

export default function DashboardSponsor() {
  return (
    <div className="page">
      <h1 className="sm:text-8xl text-6xl pb-11">Our Sponsors</h1>
      <div className="sponsor-container gap-16">
        {/* <div className="sponsor-text">Thank you for our sponsors!</div> */}
        <div className="sponsortext flex text-xl">
          <p>
            We've set out to establish an environment which promotes
            interactions between club members and the game development industry
            at large. To better serve the CGD community, we have created a
            sponsorship package for any organization interested in helping us
            support the game developers of tomorrow!
          </p>
        </div>
        <img
          src={sponsorpacklm}
          alt="concordia gamedev club sponsorship package overview light mode"
          className="sponsor-img"
        />
        <div className="riseup flex flex-col lg:flex-row gap-5">
          <a
            className="button-container"
            target="_blank"
            href="/uploads/CGD_sponsorship_package_2023.pdf"
          >
            <p className="py-4 align-middle w-full lg:w-80 text-center">
              Click here for the detailed sponsorship package PDF
            </p>
          </a>
          <a
            className="button-container flex items-center justify-center"
            href="mailto:game.development@concordia.ca"
          >
            <p className="py-4">Become a Sponsor!</p>
          </a>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-6xl pb-11">Current Partners</h1>
          <div className="past-sponsors flex justify-center items-center gap-6">
            <div className="flex flex-col items-center w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 gap-8">
              <a href="https://dotbigbang.com/">
                <img
                  src={dotbigbang}
                  alt="dot-big-bang icon"
                  className="w-full h-full object-contain rounded-md hover:scale-105 transition-transform duration-300 ease-in-out"
                />
              </a>
              <span className="sponsortext text-xl">DotBigBang</span>
            </div>
            <div className="flex flex-col items-center w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 gap-4">
              <a href="https://www.ieeeconcordia.ca/">
                <img
                  src={ieee}
                  alt="IEEE icon"
                  className="w-full h-full object-contain rounded-md hover:scale-105 transition-transform duration-300 ease-in-out"
                />
              </a>
              <span className="sponsortext text-xl">IEEE Concordia</span>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <h1 className="text-4xl sm:text-6xl">Previous Sponsors</h1>
          <div className="past-sponsors">
            <img
              src={cc2mtl}
              alt="concordia gamedev club's past sponsor cyberconnect2 montreal logo"
              className="past-sponsor-img"
            />
            <img
              src={cc2}
              alt="concordia gamedev club's past sponsor cyberconnect2 logo"
              className="past-sponsor-img"
            />
            <img
              src={ubi}
              alt="concordia game dev club's past partner ubisoft logo"
              className="past-sponsor-img"
            />
          </div>
          <div className="sponsortext text-xl">
            Special thanks to our previous partners & sponsors!
          </div>
        </div>
      </div>

      <div className="background h-full fixed">
        <span>
          <img
            src={cgdpink}
            alt="cgd pink alternate logo"
            className="floaties"
          />
        </span>
        <span>
          <img
            src={cgdpink}
            alt="cgd pink alternate logo"
            className="floaties"
          />
        </span>
        <span>
          <img
            src={cgdpink}
            alt="cgd pink alternate logo"
            className="floaties"
          />
        </span>
        <span>
          <img
            src={cgdpink}
            alt="cgd pink alternate logo"
            className="floaties"
          />
        </span>
        <span>
          <img
            src={cgdpink}
            alt="cgd pink alternate logo"
            className="floaties"
          />
        </span>
      </div>
    </div>
  );
}
