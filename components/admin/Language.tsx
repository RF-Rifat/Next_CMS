// components/Language.tsx
import React, { useState } from "react";

interface LanguageItem {
  images: string;
  title: string;
}

interface LanguageProps {
  title: string;
  sub: string;
  item: LanguageItem[];
}

const LanguageComponent: React.FC<LanguageProps & { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }> = ({ title, sub, item, open, setOpen }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = item[selectedIndex];

  return (
    <div className="mb-4">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-500 mb-2">{sub}</p>

      {/* Dropdown toggle */}
      <div className="relative inline-block w-44">
        <button
          type="button"
          className="w-full flex items-center justify-between border rounded px-3 py-2 bg-white dark:bg-gray-800"
          onClick={() => setOpen((open) => !open)}
          aria-haspopup="listbox"
          aria-expanded="false"
          aria-labelledby="listbox-label"
          id="listbox-button"
          onBlur={() => setOpen(false)}
        >
          <img
            src={selected.images}
            alt={selected.title}
            className="w-5 h-5 rounded-full mr-2"
          />
          <span className="flex-1 text-left">{selected.title}</span>
          <svg
            className="w-4 h-4 ml-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown list */}
        {open && (
          <ul
            className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white border shadow-lg z-50"
            role="listbox"
            aria-labelledby="listbox-label"
          >
            {item.map((lang, i) => (
              <li
                key={i}
                className={`cursor-pointer flex items-center p-2 hover:bg-blue-100 ${
                  selectedIndex === i ? "bg-blue-200" : ""
                }`}
                onClick={() => {
                  setSelectedIndex(i);
                  setOpen(false);
                }}
                role="option"
                aria-selected={selectedIndex === i}
              >
                <img
                  src={lang.images}
                  alt={lang.title}
                  className="w-5 h-5 rounded-full mr-2"
                />
                {lang.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

function LanguageWrapper(props: LanguageProps) {
  const [open, setOpen] = React.useState(false);
  return <LanguageComponent {...props} open={open} setOpen={setOpen} />;
}

export { LanguageWrapper as Language };
