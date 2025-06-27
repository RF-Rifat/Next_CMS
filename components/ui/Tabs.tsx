"use client";
import React, { useState } from "react";

type Tab = {
  id: string;
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
};

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="w-full bg-white flex flex-col md:flex-row gap-3">
      <div className="w-full md:w-1/5 md:divide-y divide-x md:divide-x-0 divide-gray-200 flex md:flex-col flex-row md:items-start items-center md:overflow-visible overflow-x-auto">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2 flex-none md:w-full md:text-left px-4 transition duration-300 ${
              activeTab === tab.id ? "bg-blue-500 text-white" : "text-gray-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="w-full md:w-4/5 p-2">
        {tabs.map(
          (tab) =>
            tab.id === activeTab && (
              <div key={tab.id} className="tab-content">
                {tab.content}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Tabs;
