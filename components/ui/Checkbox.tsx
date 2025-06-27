"use client";
import React, { useState } from 'react';

interface CheckboxItem {
  title: string;
  checked?: boolean;
  subItems?: CheckboxItem[];
}

interface CheckboxProps {
  title: string;
  items: CheckboxItem[];
}

const Checkbox: React.FC<CheckboxProps> = ({ title, items }) => {
  const initializeCheckedState = (items: CheckboxItem[]): boolean[] =>
    items.map(item => !!item.checked);

  const [checkedItems, setCheckedItems] = useState<boolean[]>(initializeCheckedState(items));
  const [subCheckedItems, setSubCheckedItems] = useState<boolean[][]>(
    items.map(item => (item.subItems ? initializeCheckedState(item.subItems) : []))
  );

  const handleCheckboxChange = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  const handleSubCheckboxChange = (mainIndex: number, subIndex: number) => {
    const newSubCheckedItems = [...subCheckedItems];
    newSubCheckedItems[mainIndex][subIndex] = !newSubCheckedItems[mainIndex][subIndex];
    setSubCheckedItems(newSubCheckedItems);
  };

  return (
    <div>
      {title && (<p>{title}</p>)}
      <div className='w-full bg-white p-2 overflow-y-auto max-h-60 mt-1'>
        {items.map((item, index) => (
          <div key={index}>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={checkedItems[index]}
                onChange={() => handleCheckboxChange(index)}
                className="form-checkbox h-4 w-4 mr-1 text-blue-600"
              />
              <span>{item.title}</span>
            </label>
            {item.subItems && (
              <div className='ml-6'>
                {item.subItems.map((subItem, subIndex) => (
                  <label key={subIndex} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={subCheckedItems[index][subIndex]}
                      onChange={() => handleSubCheckboxChange(index, subIndex)}
                      className="form-checkbox h-4 w-4 mr-1 text-green-600"
                    />
                    <span>{subItem.title}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Checkbox;