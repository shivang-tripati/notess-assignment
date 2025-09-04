/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import OtpInput from "../components/OtpInput";

export default function Signup() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleOtp = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/request-otp",
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

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/verify-otp",
        {
          email,
          otp,
        },
        { withCredentials: true }
      );
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Sign up failed");
    }
  };

  return (
    <AuthLayout
      title="Sign up"
      subtitle="Sign up to enjoy the feature of HD"
      rightImage="/images/right-image.jpg"
    >
      {/* Step 1: Normal Fields */}
      <Input
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        label="Date of Birth"
        type="date"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
      />
      <Input
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {otpSent && (
        <OtpInput
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          email={email}
        />
      )}

      {otpSent ? (
        <Button text="Sign Up" onClick={handleVerifyOtp} />
      ) : (
        <Button text="Get OTP" onClick={handleOtp} />
      )}

      {message && <p className="mt-2 text-sm text-red-500">{message}</p>}
      <p className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <a href="/signin" className="text-blue-500">
          Sign in
        </a>
      </p>
    </AuthLayout>
  );
}
