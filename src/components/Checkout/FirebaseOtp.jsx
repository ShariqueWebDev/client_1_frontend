import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase/config";

const FirebaseOtp = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  const sendOtpHandler = async () => {
    try {
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {
        size: "invisible",
      });

      const result = await signInWithPhoneNumber(auth, phone, recaptcha);
      setConfirmation(result);

      alert("OTP Sent!");
    } catch (error) {
      console.error(error);
    }
  };

  const verifyOtpHandler = async () => {
    try {
      await confirmation.confirm(otp);
      alert("Phone Verified!");
    } catch (error) {
      console.error(error);
      alert("Invalid OTP");
    }
  };

  return (
    <>
      <div>
        <input
          type="text"
          value={phone}
          placeholder="Enter phone e.g. +91xxxxxxxxxx"
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2"
        />

        <button onClick={sendOtpHandler}>Send OTP</button>
      </div>

      <div id="recaptcha"></div>
      <div className="">
        <input
          type="text"
          value={otp}
          placeholder="Enter OTP"
          onChange={(e) => setOtp(e.target.value)}
          className="border p-2"
        />
        <button onClick={verifyOtpHandler}>Verify OTP</button>
      </div>
    </>
  );
};

export default FirebaseOtp;
