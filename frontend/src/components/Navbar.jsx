import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
const Navbar = () => {
  const dispatch = useDispatch();
  const isloggedIn = useSelector((state) => state.isloggedIn);
  console.log(isloggedIn);
  const logout = () => {
    dispatch(authActions.logout());
    sessionStorage.clear("id");
  };

  return (
    <div className="bg-gray-900 flex flex-row justify-between ">
      <h1 className=" text-xl text-orange-500 font-bold font-serif p-3">
        TODO App
      </h1>
      <div className="flex ">
        {!isloggedIn && (
          <>
            <Link to="/login">
              {" "}
              <button className="bg-white my-2 mx-4 pl-8 pr-8 p-2 rounded-md">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-white m-2 pl-8 pr-8 p-2 rounded-md">
                Sign Up
              </button>
            </Link>
          </>
        )}
        {isloggedIn && (
          <Link to="/">
            <button
              className="bg-white m-2 pl-8 pr-8 p-2 rounded-md"
              onClick={logout}
            >
              Log Out
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
