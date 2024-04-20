import React from "react";
import { CodeBracketIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const ProjectCard = ({ video, title, description, gitUrl }) => {
  return (
    <div>
      <div className="h-52 md:h-60 rounded-t-xl relative group">
        <div className="absolute inset-0 overlay overflow-hidden items-center justify-center  top-0 left-0 w-full h-full bg-[#181818] bg-opacity-0 hidden group-hover:flex group-hover:bg-opacity-80 transition-all duration-500 ">
          <Link
            href={gitUrl}
            className="h-14 w-14 mr-2 border-2 relative rounded-full border-[#ADB7BE] group/link hover:border-white cursor-none "
          >
            <CodeBracketIcon className="z-50 h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-none group-hover/link:text-white" />
          </Link>
        </div>
        <video
          controls
          loop
          style={{
            width: "100%",
            height: "100%",
            marginBottom: "2rem",
            cursor: "none",
          }}
        >
          <source src={video} type="video/mp4" />
        </video>
      </div>

      <div className="text-white rounded-b-xl mt-3 bg-[#181818]py-6 px-4">
        <h5 className="text-xl font-semibold mb-2 mt-2">{title}</h5>
        <p className="text-[#ADB7BE]">{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
