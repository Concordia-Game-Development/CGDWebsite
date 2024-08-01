import React, { useEffect } from "react";
//import the appropriate picture for the popup here
import pic from "assets/pictures/underconstruction.png";

interface ConstructionProps {
  show: boolean;
}

const ConstructionCard: React.FC<ConstructionProps> = ({ show }) => {
  useEffect(() => {
    //if the overlay is shown, prevent scrolling on the page
    if (show) document.body.style.overflow = "hidden";
    //else enable scrolling on the page
    else document.body.style.overflow = "auto";

    //cleanup statement (for if we make the show prop a use effect on the page where this component is used)
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  //return nothing if show is false duhhh
  if (!show) return null;

  return (
    //blur the background + keep this div above on the z axis
    <div className="left-0 top-0 flex content-center items-center justify-center z-50 w-full h-full fixed backdrop-blur-lg">
      <div className="flex flex-col items-center bg-wh rounded-xl p-10 h-fit gap-6 w-3/4 md:w-1/2 lg:w-1/3 m-10">
        <img
          src={pic}
          alt={"under construction image"}
          className={`w-3/4 md:w-1/2 rounded-md`}
        />
        <div className="flex flex-col gap-5 items-center">
          <h3 className="text-2xl text-dark-purple font-corbert font-bold">
            Under Construction!
          </h3>
          <p className="text-xl text-dark-purple font-corbert font-bold">
            This page is currently being worked on. Please check again later.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConstructionCard;
