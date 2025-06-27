// components/Popup.tsx
import React, { ReactNode } from "react";

interface PopupProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export const Popup: React.FC<PopupProps> = ({ title, onClose, children }) => {
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed top-0 bottom-0 right-0 left-0 bg-black/70 z-40"
        onClick={onClose}
      />
      {/* Popup container */}
      <div className="fixed top-0 bottom-0 right-0 z-50 w-96 p-4 bg-white dark:bg-gray-900">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close popup"
            className="text-gray-600 hover:text-gray-900 dark:hover:text-white transition"
          >
            &#x2715;
          </button>
        </div>
        <div>{children}</div>
      </div>
    </>
  );
};
