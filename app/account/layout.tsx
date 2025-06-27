import Image from "next/image";
import MenusUser from "./Menus";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <div className="container mx-auto my-2 md:px-6 px-2">
        <div className="flex bg-main md:rounded-xl p-2 md:mb-4 flex-col md:flex-row">
          <div className="flex items-center">
            <Image
              src="/user/1.jpg"
              width={300}
              height={300}
              alt=""
              className="w-16 h-16 object-cover mr-2 rounded-xl"
            />
            <div className="text-white">
              <i className="text-xs">
                My account
              </i>
              <h1 className="line-clamp-1 leading-none text-xl font-bold">
                  HeRa Khan
              </h1>
              <p className="text-xs">
                  Member since September 2019
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <div className="w-full md:w-1/5">
            <MenusUser
              items={[
                { title: "Dashboard", link: '/account' },
                { title: "Post", link: '/account/post' },
                { title: "Setting", link: '/account/setting' },
              ]}
            />
          </div>
          <div className="w-full md:w-4/5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}