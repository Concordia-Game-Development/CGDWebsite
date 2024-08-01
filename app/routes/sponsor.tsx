import cgdpink from "assets/icons/cgd-transp-pink.png";
import sponsorpacklm from "assets/pics/light mode-2.png";
import cc2mtl from "assets/icons/cc2-mtl.png";
import cc2 from "assets/icons/cc2.png";
import ubi from "assets/icons/ubisoft.png";
import "app/css/sponsors.css";
import type { MetaFunction } from "@remix-run/node";
import ConstructionCard from "~/components/constructioncard";

export const meta: MetaFunction = () => {
  return [
    { title: "Sponsors | CGD" },
    { name: "description", content: "Welcome to Concordia Game Dev Club!" },
  ];
};

export default function DashboardSponsor() {
  return (
    <div>
      <ConstructionCard show={true} />
      <div className="page">
        <h1 className="sm:text-8xl text-6xl pb-11">Our Sponsors</h1>
        <div className="sponsor-container">
          {/* <div className="sponsor-text">Thank you for our sponsors!</div> */}
          <div className="sponsortext flex text-lg">
            <p>
              We've set out to establish an environment which promotes
              interactions between club members and the game development
              industry at large. To better serve the CGD community, we have
              created a sponsorship package for any organization interested in
              helping us support the game developers of tomorrow!
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

          <div className="past-sponsors-container">
            <div className="sponsortext">
              Special thanks to our previous partners & sponsors!
            </div>
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
          </div>
        </div>

        <div className="background h-full">
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
    </div>
  );
}
