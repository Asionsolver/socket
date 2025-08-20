import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";

import { loginUserThunk } from "../../store/slice/user/user.thunk";
const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const state = useSelector((state) => state.userReducer);
  console.log(state.isAuthenticated);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginUserThunk());
  });

  const handleInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });

    // console.log(loginData);
  };
  return (
    <div className="flex h-screen items-center justify-center p-6">
      <div className="bg-base-300 flex w-full max-w-xl flex-col gap-5 rounded-xl p-6">
        <div className="mb-4">
          <h1 className="text-3xl font-semibold">Welcome Back! 👋</h1>
          <p className="mt-3 text-gray-500">Let's get you chatting again.</p>
        </div>

        <>
          <label className="input validator w-full">
            <FaUser />
            <input
              type="text"
              name="username"
              required
              placeholder="Username"
              minLength="3"
              title="Must be more than 3 characters"
              onChange={handleInputChange}
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
              name="password"
              required
              placeholder="Password"
              minLength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              onChange={handleInputChange}
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
        <button className="btn btn-primary text-neutral text-lg">Login</button>
        <div className="flex justify-center gap-2">
          <p className="">Don’t have an account?</p>
          <Link to={"/signup"} className="text-primary underline">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
