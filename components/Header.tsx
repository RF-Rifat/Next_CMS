import Link from 'next/link';
import Login from './Login';
import Image from 'next/image';
import Menu from './Menu';

const Header = () => {
  return (
    <header className="bg-white block">
      <div className="container mx-auto md:px-6 px-2">
        <div className="w-full flex items-center justify-between">
          <Link href="/">
            <Image
              src="/slogo-b.png"
              quality={100}
              width={200}
              height={50}
              alt='logo'
            />
          </Link>
          <Login />
        </div>
        <Menu
          items={[
            {
              title: "subCategory 1",
              link: "/",
              option: "sub",
              // SubCategory will appear on mouse hover
              subItems: [
                { title: "SubCategory 1.1", link: "/" },
                { title: "SubCategory 1.2", link: "/" }
              ]
            },
            {
              title: "post 1",
              link: "/",
              option: "post",
              limit: "5", // limit post
              // post will appear on mouse hover
              post: [
                { title: "post 2", img: "/user/1.jpg", link: "/" },
                { title: "post 3", img: "/user/2.jpg", link: "/" },
                { title: "post 2", img: "/user/7.jpg", link: "/" }
              ]
            },
            {
              title: "tab 1",
              link: "/",
              option: "tab",
              limit: "5", // limit post and tab
              // tab will appear on mouse hover
              postTabs: [
                {
                  title: "SubCategory 1.1",
                  link: "/",
                  post: [
                    { title: "post 2", img: "/user/1.jpg", link: "/" },
                    { title: "post 3", img: "/user/2.jpg", link: "/" },
                    { title: "post 2", img: "/user/7.jpg", link: "/" }
                  ]
                },
                {
                  title: "SubCategory 1.2",
                  link: "/",
                  post: [
                    { title: "SubCategory 2", img: "/user/1.jpg", link: "/" },
                    { title: "SubCategory 3", img: "/user/2.jpg", link: "/" },
                    { title: "SubCategory 2", img: "/user/7.jpg", link: "/" }
                  ]
                }
              ]
            },
            {
              title: "Category 3", link: "/",
            }
          ]}
        />
      </div>
    </header>
  );
};

export default Header;
