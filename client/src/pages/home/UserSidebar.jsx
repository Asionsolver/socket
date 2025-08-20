import { FaSearch } from "react-icons/fa";
import User from "./User";
import People from "./People";

const UserSidebar = () => {
  return (
    <div className="flex h-screen w-full max-w-[20rem] flex-col border-r border-gray-800 p-3">
      <div className="brand mb-6">
        <h1 className="text-primary text-3xl font-bold">Message</h1>
      </div>
      <div className="people mb-4">
        <label className="input">
          <FaSearch />
          <input type="search" className="grow" placeholder="Search" />
          <kbd className="kbd kbd-sm">⌘</kbd>
          <kbd className="kbd kbd-sm">K</kbd>
        </label>
      </div>
      <div className="flex flex-1 flex-col gap-5 overflow-y-auto rounded-md border border-gray-800 p-3">
        <People />
        <People />
      </div>
      <div className="footer mt-4 flex h-[5rem] items-center rounded-md border border-gray-800">
        <User showSettings={true} />
      </div>
    </div>
  );
};

export default UserSidebar;
