import { useEffect, useRef, useState } from "react";
import { IoMdSettings } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
const User = ({ showSettings = true }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      //   console.log(event.target);
      //   console.log(!dropdownRef.current.contains(event.target));
      //   console.log(dropdownRef.current);
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="flex w-full items-center justify-between gap-5 p-2">
      <div className="avatar avatar-online">
        <div className="w-12 rounded-full">
          <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
        </div>
      </div>
      <div className="flex w-full items-center justify-between">
        <div>
          <h2 className="text-lg">Full Name</h2>
          <p className="text-xs">UserName</p>
        </div>
        {showSettings && (
          <div className="relative" ref={dropdownRef}>
            <button
              className="mr-6 h-14 rounded-full"
              onClick={() => setOpen((prev) => !prev)}
            >
              <IoMdSettings size={30} />
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  key="dropdown"
                  initial={{ opacity: 0, x: 20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeIn" }}
                  className="bg-neutral absolute top-1/2 left-full z-50 -ml-4 w-40 -translate-y-25 rounded-lg border border-gray-700 p-2 shadow-md"
                >
                  <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <button className="hover:bg-primary w-full rounded px-2 py-1 text-left">
                        Profile
                      </button>
                    </li>
                    <li>
                      <button className="hover:bg-primary w-full rounded px-2 py-1 text-left">
                        Settings
                      </button>
                    </li>
                    <li>
                      <button className="hover:text-neutral hover:bg-secondary w-full rounded px-2 py-1 text-left hover:font-bold">
                        Logout
                      </button>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
