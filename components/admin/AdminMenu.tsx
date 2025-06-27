"use client";
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface MenuItem {
  _id: string;
  name: string;
  link: string;
  parent_ID: string;
}

const flatMenu = [
  {
    _id: "1",
    name: "Page",
    link: "/nx-admin/page",
    parent_ID: "",
  },
  {
    _id: "2",
    name: "Page list",
    link: "/nx-admin/page",
    parent_ID: "1",
  },
  {
    _id: "3",
    name: "Page add",
    link: "/nx-admin/page/add",
    parent_ID: "1",
  },
  {
    _id: "4",
    name: "Post",
    link: "/nx-admin/post",
    parent_ID: "",
  },
  {
    _id: "5",
    name: "Post list",
    link: "/nx-admin/post",
    parent_ID: "4",
  },
  {
    _id: "6",
    name: "Post add",
    link: "/nx-admin/post/add",
    parent_ID: "4",
  },
  {
    _id: "7",
    name: "Category",
    link: "/nx-admin/post/category",
    parent_ID: "4",
  },
  {
    _id: "8",
    name: "Menu",
    link: "/nx-admin/menu",
    parent_ID: "",
  },
  {
    _id: "9",
    name: "Menu list",
    link: "/nx-admin/menu",
    parent_ID: "8",
  },
  {
    _id: "10",
    name: "Menu add",
    link: "/nx-admin/menu/add",
    parent_ID: "8",
  },
  {
    _id: "11",
    name: "Setting",
    link: "/nx-admin/setting",
    parent_ID: "",
  },
  {
    _id: "12",
    name: "Layouts",
    link: "/nx-admin/layouts",
    parent_ID: "",
  },
  {
    _id: "13",
    name: "Layouts list",
    link: "/nx-admin/layouts",
    parent_ID: "12",
  },
  {
    _id: "14",
    name: "Template",
    link: "/nx-admin/layouts/template",
    parent_ID: "12",
  },
  {
    _id: "15",
    name: "Layouts add",
    link: "/nx-admin/layouts/add",
    parent_ID: "12",
  },
  {
    _id: "16",
    name: "Addons",
    link: "/nx-admin/addon",
    parent_ID: "",
  },
  {
    _id: "17",
    name: "Addons list",
    link: "/nx-admin/addon",
    parent_ID: "16",
  },
  {
    _id: "18",
    name: "Addons add",
    link: "/nx-admin/addon/add",
    parent_ID: "16",
  },
  {
    _id: "19",
    name: "Form",
    link: "/nx-admin/contact",
    parent_ID: "",
  },
  {
    _id: "20",
    name: "Submissions",
    link: "/nx-admin/contact",
    parent_ID: "19",
  },
  {
    _id: "23",
    name: "Users",
    link: "/nx-admin/users",
    parent_ID: "",
  },
  {
    _id: "24",
    name: "User list",
    link: "/nx-admin/users",
    parent_ID: "23",
  },
  {
    _id: "25",
    name: "User add",
    link: "/nx-admin/users/add",
    parent_ID: "23",
  },
  {
    _id: "26",
    name: "Profile",
    link: "/nx-admin/users/profile",
    parent_ID: "",
  },
  {
    _id: "27",
    name: "Profile",
    link: "/nx-admin/users/profile",
    parent_ID: "26",
  },
  {
    _id: "28",
    name: "Logout",
    link: "/nx-admin/logout",
    parent_ID: "26",
  }
];

interface Category {
  _id: string;
  name: string;
  link: string;
  subcategories?: MenuItem[];
}

const AdminMenu = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Convert flat menu to hierarchical structure
  const buildMenuHierarchy = (): Category[] => {
    const topLevelItems = flatMenu.filter(item => item.parent_ID === "");
    return topLevelItems.map(item => ({
      _id: item._id,
      name: item.name,
      link: item.link,
      subcategories: flatMenu.filter(subItem => subItem.parent_ID === item._id)
    }));
  };

  const categories = buildMenuHierarchy();

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      const handleClickOutside = (event: MouseEvent) => {
        if (!(event.target as HTMLElement).closest("#mobile-menu")) {
          closeMobileMenu();
        }
      };
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Desktop Version */}
      <div className="hidden md:flex items-center">
        {categories.map((category) => (
          <div key={category._id} className="relative group">
            <Link
              href={category.link}
              className={`p-2 block hover:bg-gray-200 ${
                pathname === category.link ? 'bg-gray-300' : ''
              }`}
            >
              {category.name}
            </Link>
            {category.subcategories && category.subcategories.length > 0 && (
              <div className="absolute divide-y divide-gray-200 w-48 right-0 top-full bg-white hidden group-hover:block z-50">
                {category.subcategories.map((subcategory) => (
                  <Link
                    key={subcategory._id}
                    href={subcategory.link}
                    className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                      pathname === subcategory.link ? 'bg-gray-300' : ''
                    }`}
                  >
                    {subcategory.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Version */}
      <div className="md:hidden">
        <button onClick={handleMobileMenuToggle} className="p-2">
          menu
        </button>

        {isMobileMenuOpen && (
          <div id="mobile-menu" className="fixed z-50 divide-y left-0 top-0 bottom-0 right-0 w-full bg-white h-full overflow-y-auto">
            <button onClick={closeMobileMenu} className="absolute top-4 right-4 p-2 bg-gray-200 rounded-full">✖</button>
            {categories.map((category) => (
              <div key={category._id} className='block divide-y'>
                <Link
                  href={category.link}
                  onClick={closeMobileMenu}
                  className={`block p-2 hover:bg-gray-200 ${
                    pathname === category.link ? 'bg-gray-300' : ''
                  }`}
                >
                  {category.name}
                </Link>
                {category.subcategories && category.subcategories.map((subcategory) => (
                  <Link
                    key={subcategory._id}
                    href={subcategory.link}
                    onClick={closeMobileMenu}
                    className={`block px-4 py-2 hover:bg-gray-100 ${
                      pathname === subcategory.link ? 'bg-gray-300' : ''
                    }`}
                  >
                    {subcategory.name}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminMenu;