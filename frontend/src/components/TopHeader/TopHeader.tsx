import React from "react";
import { MdMenu } from "react-icons/md";

const TopHeader = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <header className="w-full h-20 bg-white border-b flex items-center justify-between px-6">

      <div className="flex items-center gap-3">
        
        {/* BOTÃO MOBILE */}
        <button 
          onClick={toggleSidebar}
          className="md:hidden text-gray-700 text-2xl"
        >
          <MdMenu />
        </button>

        {/* Avatar */}
        <div className="size-10 rounded-full bg-gray-300 overflow-hidden">
          <img src="https://api.dicebear.com/8.x/lorelei/svg?seed=Dominique" />
        </div>

        <span className="font-semibold text-gray-900 text-sm">
          Dominique C.
        </span>
      </div>

    </header>
  );
};

export default TopHeader;