import React, { useState, useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { BsImageFill } from "react-icons/bs";
import { useParams, useNavigate } from "react-router-dom";
import { googleLogout, GoogleOAuthProvider } from "@react-oauth/google";

import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../utils/data";
import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { MdLogout } from "react-icons/md";

const randomImage =
  "https://source.unsplash.com/1600x900/?nature,technology,food";

const activeBtnStyles =
  "bg-green-600 mt-5 text-white font-bold p-2 px-3 rounded-full outline-none";
const notActiveBtnStyles =
  "bg-primary mt-5  mr-2 text-black font-bold p-2 px-3 rounded-full outline-none";
function UserProfile() {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("created");

  const navigate = useNavigate();

  const { userId } = useParams();

  const User =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  useEffect(() => {
    if (text === "Created") {
      const createdPinsQuery = userCreatedPinsQuery(userId);

      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);

      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    }
  }, [text, userId]);

  useEffect(() => {
    const query = userQuery(userId);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  if (!user) {
    return <Spinner message={"Loading Profile..."} />;
  }

  const logout = () => {
    console.log("Clear Logout");
    googleLogout();
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="relative pb-2 justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              src={randomImage}
              className="w-full h-370 2xl:h-510 shadow-lg object-cover"
              alt="banner-page"
            />
            <img
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
              src={user.image}
              alt="user-profile"
            />
            <h1 className="font-bold text-3xl text-center mt-3">
              {user.userName}
            </h1>
            <div className="absolute top-0 z-1 right-0 p-2">
              {userId === User.sub && (
                <GoogleOAuthProvider
                  clientId={process.env.REACT_APP_PUBLIC_GOOGLE_API_TOKEN}
                >
                  <button
                    onClick={logout}
                    className="bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                  >
                    <AiOutlineLogout fontSize={20} />
                  </button>
                </GoogleOAuthProvider>
              )}
            </div>

            <div className="text-center mb-7">
              <button
                type="button"
                onClick={(e) => {
                  setText(e.target.textContent);
                  setActiveBtn("created");
                }}
                className={`${
                  activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
                }`}
              >
                Created
              </button>

              <button
                type="button"
                onClick={(e) => {
                  setText(e.target.textContent);
                  setActiveBtn("saved");
                }}
                className={`${
                  activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
                }`}
              >
                Saved
              </button>
            </div>
            {pins?.length ? (
              <div className="px-2">
                <MasonryLayout pins={pins} />
              </div>
            ) : (
              <div className="flex flex-col justify-center font-bold items-center mt-3">
                <div className="mb-5">
                  <BsImageFill fontSize={50} color={"green"} />
                </div>
                <p>No Post Found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
