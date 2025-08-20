import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router";

const Signup = () => {
  const [singUpData, setSingUpData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setSingUpData({
      ...singUpData,
      [e.target.name]: e.target.value,
    });

    console.log(singUpData);
  };
  return (
    <div className="flex h-screen items-center justify-center p-6">
      <div className="bg-base-300 flex w-full max-w-xl flex-col gap-5 rounded-xl p-6">
        <div className="mb-4">
          <h1 className="text-3xl font-semibold">Join the Conversation! 💭</h1>
          <p className="mt-3 text-gray-500">It only takes a few seconds</p>
        </div>
        <>
          <label className="input validator w-full">
            <FaUser />
            <input
              type="text"
              required
              placeholder="Full Name"
              minLength="3"
              title="Must be more than 3 characters"
              onChange={handleInputChange}
              name="fullName"
            />
          </label>
          <p className="validator-hint -mt-2 hidden">
            Must be more than 3 characters
          </p>
        </>
        <>
          <label className="input validator w-full">
            <FaUser />
            <input
              type="text"
              required
              placeholder="Username"
              minLength="3"
              title="Must be more than 3 characters"
              onChange={handleInputChange}
              name="username"
            />
          </label>
          <p className="validator-hint -mt-2 hidden">
            Must be more than 3 characters
          </p>
        </>
        <>
          <label className="input validator w-full">
            <FaLock />
            <input
              type="password"
              required
              placeholder="Password"
              minLength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              onChange={handleInputChange}
              name="password"
            />
          </label>
          <p className="validator-hint -mt-2 hidden">
            Must be more than 8 characters, including
            <br />
            At least one number <br />
            At least one lowercase letter <br />
            At least one uppercase letter
          </p>
        </>
        <>
          <label className="input validator w-full">
            <FaLock />
            <input
              type="password"
              required
              placeholder="Confirm Password"
              minLength="8"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              onChange={handleInputChange}
              name="confirmPassword"
            />
          </label>
          <p className="validator-hint -mt-2 hidden">
            Your can not enter password
          </p>
        </>
        <button className="btn btn-primary text-neutral text-lg">Signup</button>
        <div className="flex justify-center gap-2">
          <p className="">Already have an account?</p>
          <Link to={"/login"} className="text-primary underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
