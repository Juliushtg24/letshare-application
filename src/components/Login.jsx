import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import jwt_decode from "jwt-decode";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";

import { client } from "../client";

const clientID =
  "1051701222105-k3ovdlhmeqqbpq9ksjv6nm6ohtuee8i1.apps.googleusercontent.com";

function Login() {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    const decode = jwt_decode(response.credential);

    // Output decode
    console.log(decode);

    localStorage.setItem("user", JSON.stringify(decode));

    const { name, sub, picture } = decode;

    const doc = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };

    client.createIfNotExists(doc).then((res) => {
      navigate("/", { replace: true });
      console.log(res);
    });
  };

  return (
    <GoogleOAuthProvider clientId={clientID}>
      <div className="flex justify-start items-center flex-col h-screen">
        <div className="relative w-full h-full">
          <video
            src={shareVideo}
            type="video/mp4"
            loop
            controls={false}
            muted
            autoPlay
            className="w-full h-full object-cover"
          />
          <div className="absolute flex flex-col justify-center items-center top-o right-0 left-0 bottom-0 bg-blackOverlay w-full h-full">
            <div className="p-5">
              <img src={logo} width="130px" alt="logo" />
            </div>
            <div className="shadow-2xl">
              <GoogleLogin
                onSuccess={responseGoogle}
                onError={() => "Error"}
                cookiePolicy="single_host_origin"
              >
                Login
              </GoogleLogin>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
