// Authfirebase.js
import React, { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "./firebase";

const Authfirebase = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isOtpSent, setIsOtpSent] = useState(false);

  // Setup reCAPTCHA
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",            // container ID
        {
          size: "invisible",
          callback: () => console.log("Captcha resolved"),
        },
        auth                               // auth MUST be last argument
      );
    }
  };

  // Send OTP
  const sendOtp = async () => {
    if (!phone) return alert("Enter valid phone number");

    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    try {
      const confirmation = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(confirmation);
      setIsOtpSent(true);
      alert("OTP Sent!");
    } catch (err) {
      console.error(err);
      alert("OTP not sent. Check console.");
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    if (!otp) return alert("Enter OTP");
    try {
      await confirmationResult.confirm(otp);
      alert("Login Successful!");
    } catch (err) {
      console.error(err);
      alert("Invalid OTP");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white rounded-xl shadow-lg border text-center">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Phone Login</h2>

      {!isOtpSent ? (
        <>
          <input
            type="text"
            placeholder="+1 9876543210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={sendOtp}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Send OTP
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-3 mb-4 border rounded-lg focus:ring-2 focus:ring-green-500"
          />

          <button
            onClick={verifyOtp}
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Verify OTP
          </button>
        </>
      )}

      {/* Mandatory Firebase Element */}
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default Authfirebase;
