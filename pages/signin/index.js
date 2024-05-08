import React, { useState, useRef, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Image from "@/assets/images/section-1.png";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
const supabase = createClient(
  "https://fwuhjctlcdmrmeixbims.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3dWhqY3RsY2Rtcm1laXhiaW1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYwMzMwNjEsImV4cCI6MjAyMTYwOTA2MX0.NvbJChgwidz3CsxP-ACZJF0ldHLusxGms33RWS5Jf8c"
);
import { createNewUser, loginUser, updateUserData } from "@/auth/auth";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import EmailVerification from "@/components/EmailVerification";

const InitData = {
  email: "",
  password: "",
  confirmPassword: "",
  age: "",
  firstName: "",
  lastName: "",
  address: "",
};

export const SignupScreen = ({
  isNewAccount = true,
  setIsLoginScreen = () => {},
}) => {
  const [data, setData] = useState({ ...InitData });
  const profileRef = useRef(null);
  const onChangeInput = (name, value) => {
    if (name != "") {
      setData({ ...data, [name]: value });
    }
  };
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [newUserData, setNewUserData] = useState({})

  useEffect(() => {
    if (!isNewAccount) {
      setData({
        email: auth.user.user.user_metadata.email,
        age: auth.user.user.user_metadata.age,
        firstName: auth.user.user.user_metadata.first_name,
        lastName: auth.user.user.user_metadata.last_name,
        address: auth.user.user.user_metadata.address,
        is_admin: auth.user.user.user_metadata.is_admin
      });
    }
  }, []);

  const createNewAccount = async () => {
    let result =  await createNewUser(data);
  }

  return (
    <>
      <>
        <div className="fields">
          <div className="row">
            <h2>{isNewAccount ? "Create New Account" : "Update Profile"}</h2>
          </div>
          <div className="row">
            <Input
              type="text"
              placeholder="First Name"
              value={data.firstName}
              onChangeInput={onChangeInput}
              name="firstName"
            />

            <Input
              type="text"
              placeholder="Last Name"
              value={data.lastName}
              onChangeInput={onChangeInput}
              name="lastName"
            />
          </div>
          <div className="row">
            <Input
              type="text"
              placeholder="Email"
              value={data.email}
              onChangeInput={onChangeInput}
              name="email"
              disabled={!isNewAccount}
            />
          </div>
          {isNewAccount && (
            <>
              <div className="row">
                <Input
                  type="password"
                  placeholder="Password"
                  value={data.password}
                  onChangeInput={onChangeInput}
                  name="password"
                />
              </div>
              <div className="row">
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={data.confirmPassword}
                  onChangeInput={onChangeInput}
                  name="confirmPassword"
                />
              </div>
            </>
          )}

          <div className="row">
            <Input
              type="number"
              placeholder="Age"
              value={data.age}
              onChangeInput={onChangeInput}
              name="age"
            />
          </div>
          <div className="row">
            <Input
              type="text"
              placeholder="Address"
              value={data.address}
              onChangeInput={onChangeInput}
              name="address"
            />
          </div>

          {!isNewAccount && (
            <div className="row">
              <input
                type="file"
                onChange={(e) => {
                  // setProfilePic(e.target)
                }}
                ref={profileRef}
              />
            </div>
          )}
          {isNewAccount && (
            <div className="forget-pass">
              <p>Forget Password?</p>
            </div>
          )}
          <div className="row">
            <Button
              text={isNewAccount ? "Submit" : "Save"}
              onClick={() => {
                if (isNewAccount) {
                  createNewAccount()
                } else {
                  updateUserData(
                    profileRef,
                    auth.user.user.id,
                    {
                      ...auth.user.user.user_metadata,

                      first_name: data.firstName,
                      last_name: data.lastName,
                      age: data.age,
                      address: data.address,
                      is_admin: data.is_admin,
                    },
                    dispatch
                  );
                }
              }}
            />
          </div>
        </div>
        {isNewAccount && (
          <div className="row-text">
            <p>
              Already have an account?{" "}
              <span onClick={() => setIsLoginScreen(true)} className="link">
                Login
              </span>
            </p>
          </div>
        )}
      </>
      {/* <EmailVerification /> */}
    </>
          
  );
};

const SignIn = () => {
  const [isLoginScreen, setIsLoginScreen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const loginWithGoogle = async () => {
    const result = supabase.auth.signInWithOAuth({
      provider: "google",
    });

    console.log("result----", result);
  };

  const LoginScreen = () => {
    const [data, setData] = useState({ ...InitData });

    const onChangeInput = (name, value) => {
      if (name != "") {
        setData({ ...data, [name]: value });
      }
    };

    return (
      <>
        <div className="fields">
          <div className="row">
            <h2>Login</h2>
          </div>
          <div className="row">
            <Input
              type="text"
              placeholder="Email"
              value={data.email}
              onChangeInput={onChangeInput}
              name="email"
            />
          </div>
          <div className="row">
            <Input
              type="password"
              placeholder="Password"
              value={data.password}
              onChangeInput={onChangeInput}
              name="password"
            />
          </div>
          <div className="forget-pass">
            <p>Forget Password?</p>
          </div>
          <div className="row">
            <Button
              text="Submit"
              onClick={() => loginUser(data, dispatch, router)}
            />
          </div>
        </div>
        <div className="row-text">
          <p>
            Don't have an account?{" "}
            <span onClick={() => setIsLoginScreen(false)} className="link">
              Singup
            </span>{" "}
          </p>
        </div>
        <div className="row">
          {/* <div
            class="g_id_signin"
            data-type="standard"
            data-shape="pill"
            data-theme="outline"
            data-text="signin_with"
            data-size="large"
            data-logo_alignment="left"
          >
            <button
              onClick={() => {
                loginWithGoogle();
              }}
            >
              Login With Google
            </button>
          </div> */}
        </div>
      </>
    );
  };

  return (
    <div className="signin-page">
      <div className="signin-bg">
        <img src={Image.src} alt="" />
      </div>
      <div className="signin-form">
        {isLoginScreen ? (
          <LoginScreen />
        ) : (
          <SignupScreen setIsLoginScreen={setIsLoginScreen} />
        )}
      </div>
    </div>
  );
};

export default SignIn;
