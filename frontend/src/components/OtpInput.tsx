import { useState, useEffect } from "react";
import { Eye, EyeOff, RefreshCw } from "lucide-react";
import axios from "axios";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  email: string; // needed to resend OTP
  remember?: boolean; // whether to remember login
}

export default function OtpInput({ value, onChange, email, remember }: Props) {
  const [show, setShow] = useState(false);
  const [timer, setTimer] = useState(0);
  const [otpSent, setOtpSent] = useState(false);

  // countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (otpSent && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer, otpSent]);

  // resend otp
  const handleResend = async () => {
    try {
      await axios.post(
        "http://localhost:5000/auth/request-otp",
        { email, remember },
        { withCredentials: true }
      );
      setOtpSent(true);
      setTimer(60);
    } catch {
      alert("Failed to resend OTP");
    }
  };

  return (
    <div className="w-[399px] mb-6">
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          placeholder="OTP"
          value={value}
          onChange={onChange}
          className="w-full h-[50px] rounded-md border border-[#D9D9D9] 
                     px-4 text-base text-gray-900 focus:outline-none 
                     focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* resend section */}
      <div className="flex justify-end mt-2">
        {otpSent && timer > 0 ? (
          <span className="text-sm text-gray-500">Resend OTP in {timer}s</span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            className="flex items-center gap-1 text-blue-400 text-sm text-blue-500 hover:underline"
          >
            <RefreshCw size={14} />
            Resend OTP
          </button>
        )}
      </div>
    </div>
  );
}
