"use client";

import { useState } from "react";
import CreateTab from "./create-tab";
import ListTab from "./list-tab";

const NewsMain = () => {
  const tabs = [
    {
      title: "Create",
      tab: <CreateTab />,
    },
    {
      title: "List",
      tab: <ListTab />,
    },
  ];

  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <div className="space-y-4">
      <div>
        {tabs.map((item, i) => {
          return (
            <button
              key={i}
              className={`py-2 px-5 cursor-pointer ${selectedTab.title === item.title && "free-green-bg text-white"}`}
              onClick={() => setSelectedTab(item)}
            >
              {item.title}
            </button>
          );
        })}
      </div>
      {selectedTab.tab}
    </div>
  );
};

export default NewsMain;
