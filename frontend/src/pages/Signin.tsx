/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import GoogleLoginButton from "../components/GoogleLoginButton";
import Input from "../components/Input";
import Button from "../components/Button";
import OtpInput from "../components/OtpInput";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/verify-otp`,
        {
          email,
          otp,
        },
        { withCredentials: true }
      );

      if (remember) {
        localStorage.setItem("token", res.data.token);
      } else {
        sessionStorage.setItem("token", res.data.token);
      }

      navigate("/dashboard");
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Login failed");
    }
  };

  const handleOtp = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/request-otp`,
        {
          email,
        },
        { withCredentials: true }
      );
      if (res.status === 200) {
        setOtpSent(true);
        setMessage("OTP sent to email!");
      }
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Failed to send OTP");
    }
  };

  return (
    <AuthLayout
      title="Sign In"
      subtitle="Please login to continue to your account."
      rightImage="/images/right-image.jpg"
    >
      {/* Email input */}
      <Input
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <OtpInput
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        email={email}
        remember={remember}
      />

      <div className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
          id="rememberMe"
        />
        <label htmlFor="rememberMe" className="text-sm text-gray-600">
          Keep me logged in
        </label>
      </div>

      {!otpSent ? (
        <Button text="Send OTP" onClick={handleOtp} />
      ) : (
        <Button text="Login" onClick={handleLogin} />
      )}

      {message && <p className="mt-2 text-sm text-red-500">{message}</p>}

      <p className="mt-2 text-sm text-center">
        Need an account?{" "}
        <a href="/signup" className="text-blue-500">
          Create one
        </a>
      </p>

      <GoogleLoginButton />
    </AuthLayout>
  );
}
