import { useState } from "react";
import {FileManagement} from "./index";
import BotContentCreation from "./BotContentCreation/BotContentCreation";

function ContentLibrary() {
  const [activeTab, setActiveTab] = useState("File Management");
    //tabs state management.
    const renderContent = () => {
      switch (activeTab) {
        case "File Management":
          return (
            <>
            <FileManagement />
            </>
          );
        case "Link Management":
          return <div>Link Management Content</div>;
        case "Bot Content Creation":
          return <BotContentCreation />;
        case "Content Dashboard":
        default:
          return <div>Content Dashboard Content</div>;
      }
    };
  
  return (
    <>
      <div className="mt-10 w-full flex-col justify-center space-y-4 md:flex md:flex-row md:w-full">
        <div className="flex w-full items-end border-b border-gray-300 flex-wrap pb-4">
          {[
            "Content Dashboard",
            "File Management",
            "Link Management",
            "Bot Content Creation",
          ].map((filter) => (
            <div
              className={`cursor-pointer px-4 py-2 text-base font-semibold leading-normal ${
                activeTab === filter
                  ? "text-black border-b-2 border-black"
                  : "text-gray-700"
              }`}
              key={filter}
              onClick={() => setActiveTab(filter)}
            >
              {filter}
            </div>
          ))}
        </div>
      </div>

      {renderContent()}
    </>
  );
}

export default ContentLibrary;


