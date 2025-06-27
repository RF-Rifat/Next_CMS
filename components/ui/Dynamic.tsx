"use client";
import React, { useState, type ReactElement } from "react";

interface DynamicFieldsProps {
    children: ReactElement | ReactElement[];
    dGrid: number; // Default grid layout (desktop)
    mGrid: number; // Mobile grid layout
}

interface Section {
  id: number;
  fields: ReactElement[];
}

const Dynamic: React.FC<DynamicFieldsProps> = ({ children, dGrid, mGrid }) => {
  const childrenArray = React.Children.toArray(children).filter(
    (child): child is ReactElement => React.isValidElement(child)
  );

  const [sections, setSections] = useState<Section[]>([
    { id: 1, fields: [...childrenArray] },
  ]);

  const addSection = () => {
    setSections((prevSections) => [
      ...prevSections,
      { id: prevSections.length + 1, fields: [...childrenArray] },
    ]);
  };

  const removeSection = (id: number) => {
    setSections((prevSections) => prevSections.filter((section) => section.id !== id));
  };

  return (
    <div className="my-2">
        <div className={`grid gap-2 md:gap-4 md:grid-cols-${dGrid} grid-cols-${mGrid}`}>
            {sections.map((section) => (
                <div key={section.id} className="border p-2">
                    <div className="flex items-center justify-between w-full">
                        <h1>
                            {section.id}
                        </h1>
                        <button
                            onClick={() => removeSection(section.id)}
                        >
                            ✖
                        </button>
                    </div>
                    {section.fields.map((field, index) => (
                        <div key={field.key ?? index} className="flex items-center space-x-2">
                        <div className="flex-grow">{field}</div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
        <button
            onClick={addSection}
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 mt-4"
        >
            Add New Section
        </button>
    </div>
  );
};

export default Dynamic;