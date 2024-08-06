import type { MetaFunction } from "@remix-run/node";
import "app/css/homepage.css";
import "assets/fonts/fonts.css";
import "app/css/background-animation.css";
import cgdpink from "assets/icons/cgd-transp-pink.png";

export const meta: MetaFunction = () => {
  return [
    { title: "Home | CGD" },
    { name: "description", content: "Welcome to Concordia Game Dev Club!" },
    { icon: "./favicon.ico" },
  ];
};

export default function Index() {
  return (
    <div className="header-footer flex-grow">
      <div className="page">
        <h1 className="gameclub sm:text-8xl text-5xl pb-11">
          Concordia Game Development
        </h1>
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
  );
}
