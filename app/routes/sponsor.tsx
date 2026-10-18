import cgdpink from "assets/icons/cgd-transp-pink.png";
import sponsorpacklm from "assets/pics/light mode-2.png";
import cc2mtl from "assets/icons/cc2-mtl.png";
import cc2 from "assets/icons/cc2.png";
import ubi from "assets/icons/ubisoft.png";
import "app/css/sponsors.css";
import type { MetaFunction } from "@remix-run/node";
import ConstructionCard from "~/components/constructioncard";
import { Button } from "@/components/ui/button";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Sponsors | CGD" },
    { name: "description", content: "Welcome to Concordia Game Dev Club!" },
  ];
};

export default function DashboardSponsor() {
  return (
    <div className="sponsor-page">
      <ConstructionCard show={false} />
      <div className="sponsor-page-content">
        <h1 className="sm:text-8xl text-6xl pb-11 text-center text-dark-purple">
        Sponsorship at CGD
        </h1>
        <div className="sponsor-container">
          {/* <div className="sponsor-text">Thank you for our sponsors!</div> */}
          <div className="sponsortext flex text-lg">
            <p>

              At CGD, we’re committed to creating an environment that connects our members with one another and with the wider game development industry.
              We’re currently preparing a new sponsorship package to better support our community and the game developers of tomorrow.
              If you’re interested in sponsoring CGD, feel free to reach out — we’d love to hear from you!
            </p>
          </div>
          {/* <img
            src={sponsorpacklm}
            alt="concordia gamedev club sponsorship package overview light mode"
            className="sponsor-img"
          />
          <div className="riseup flex flex-col lg:flex-row gap-5 max-w-sm lg:max-w-3xl"> */}
            {/* <Button
              asChild
              variant={"secondary"}
              className="text-wfull/85 bg-cgd-pink/85 hover:bg-cgd-pink/100 font-bold font-corbert xl:text-2xl md:text-xl text-base xl:py-8 md:pt-5 md:pb-6 pt-4 pb-5 rounded-full active:scale-95 transition-transform ease-in-out"
            >
              <Link
                to={"/uploads/CGD_sponsorship_package_2023.pdf"}
                target="_blank"
              >
                Detailed sponsorship package PDF
              </Link>
            </Button> */}
            <Button
              asChild
              variant={"default"}
              className="text-cgd-pink/85 hover:text-cgd-pink bg-wfull/85 hover:bg-wfull font-bold font-corbert xl:text-2xl md:text-xl text-base xl:py-8 md:pt-5 md:pb-6 pt-4 pb-5 rounded-full active:scale-95 transition-transform ease-in-out"
            >
              <Link to={"mailto:concordiagamedev@csu.qc.ca"}>
                Click here to Become a Sponsor!
              </Link>
            </Button>
          </div>

          {/* <div className="past-sponsors-container">
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
        </div> */}

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
