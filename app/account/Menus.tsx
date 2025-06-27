"use client";
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface MenuItem {
  title: string;
  link: string;
}

interface MenusProps {
  items: MenuItem[];
}

const MenusUser: React.FC<MenusProps> = ({ items }) => {
  const pathname = usePathname();

  return (
    <div className='divide-gray-200 divide-x md:divide-y md:divide-x-none flex md:flex-col flex-row md:overflow-visible overflow-x-auto no-ber w-full bg-white'>
      {items.map((item) => (
        <Link
          key={item.link}
          href={item.link}
          className={`flex-none p-2 ${
            pathname === item.link ? 'bg-gray-100 text-main' : ''
          }`}
        >
          <span className='leading-none whitespace-nowrap font-bold text-xs md:text-sm'>
            {item.title}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default MenusUser;
