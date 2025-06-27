'use client';
import Image from 'next/image';
import { useState } from 'react';

interface LayoutOption {
  title: string;
  image: string;
}

interface NavModeProps {
  title?: string;
  sub?: string;
  options?: LayoutOption[];
}

const defaultOptions: LayoutOption[] = [
  { title: 'Classic', image: '/layouts/classic.jpg' },
  { title: 'Modern', image: '/layouts/modern.jpg' },
  { title: 'Stacked Side', image: '/layouts/stackedSide.jpg' },
  { title: 'Simple', image: '/layouts/simple.jpg' },
  { title: 'Decked', image: '/layouts/decked.jpg' },
  { title: 'Blank', image: '/layouts/blank.jpg' }
];

const NavMode = ({ title = 'Nav Mode', sub = 'Select layout mode', options = defaultOptions }: NavModeProps) => {
  const [selected, setSelected] = useState<string>(options[0].title);

  return (
    <div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="grid grid-cols-3 gap-4">
        {options.map((option) => (
          <div
            key={option.title}
            className={`cursor-pointer border rounded overflow-hidden transition-all ${
              selected === option.title ? 'border-blue-500 ring-1 ring-blue-300' : 'border-gray-200'
            }`}
            onClick={() => setSelected(option.title)}
          >
            <Image width={90} height={80} src={option.image} alt={option.title} className="w-full h-16" />
            <div
              className={`p-2 text-center text-sm font-semibold ${
                selected === option.title ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              {option.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavMode;