"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
  useSendOtpMutation,
  useResetPasswordMutation,
  useSendSignupOtpMutation,
  useVerifySignupOtpMutation,
} from "../../redux/api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "@/redux/reducers/auth-reducers";

import toast from "react-hot-toast";
import { staticApi } from "@/redux/api/staticApi";

// 🔹 Zod Schemas
const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 chars"),
});

const registerSchema = z.object({
  name: z.string().min(3, "Username too short"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password too short"),
  dob: z.string().nonempty("Date of birth required"),
  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "Select gender" }),
  }),
  // photo: z.string().url("Invalid photo URL"),
});

const forgotSchema = z.object({
  email: z.string().email("Invalid email"),
});

const signupOtpSchema = z.object({
  otp: z.string().min(4, "OTP must be 4 digits"),
});

const otpSchema = z.object({
  email: z.string().email("Invalid email"),
  resetOtp: z.string().min(4, "OTP must be at least 4 digits"), // changed from "otp"
  newPassword: z.string().min(6, "Password too short"), // changed from "password"
});

export default function LoginRegisterPage() {
  const [view, setView] = useState("login"); // login | register | forgot | verification
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [forgotEmail, setForgotEmail] = useState(0);

  // const [email, setEmail] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  // 🔹 Redux RTK Query Mutations
  const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();
  const [registerUser, { isLoading: regLoading }] = useRegisterUserMutation();
  const [sendOtp, { isLoading: sendOtpLoading }] = useSendOtpMutation();
  const [resetPassword, { isLoading: resetPassLoading }] =
    useResetPasswordMutation();
  const { user } = useSelector((state) => state.auth);
  const [sendSignupOtp, { isLoading: otpSending }] = useSendSignupOtpMutation();

  const [verifySignupOtp, { isLoading: verifying }] =
    useVerifySignupOtpMutation();
  const [tempUser, setTempUser] = useState(null);

  const onSignupVerifyOtp = async (data) => {
    try {
      const res = await verifySignupOtp({
        email: forgotEmail, // stored email
        otp: data.otp,
      }).unwrap();

      dispatch(setCredentials(res));
      toast.success("Signup successful!");
      dispatch(staticApi.util.invalidateTags(["Statics"]));
    } catch (error) {
      toast.error(error?.data?.message || "Invalid OTP");
    }
  };

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        router.push("/dashboard");
      } else if (user.role === "user") {
        router.push("/");
      } else {
        router.push("/login");
      }
    }
  }, [user, router]);

  // Login Form
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  // Register Form
  const {
    register: regRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: regErrors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  // Forgot Form
  const {
    register: forgotRegister,
    handleSubmit: handleForgotSubmit,
    formState: { errors: forgotErrors },
  } = useForm({ resolver: zodResolver(forgotSchema) });

  // OTP Form
  const {
    register: otpRegister,
    handleSubmit: handleOtpSubmit,
    formState: { errors: otpErrors },
  } = useForm({ resolver: zodResolver(otpSchema) });

  const {
    register: signupOtpRegister,
    handleSubmit: handleSignupOtpSubmit,
    formState: { errors: varificationErrors },
  } = useForm({ resolver: zodResolver(signupOtpSchema) });

  // Handlers
  const onLogin = async (data) => {
    try {
      const res = await loginUser(data).unwrap();
      dispatch(setCredentials(res));
      toast.success("Login success");
      window.location.reload();
      // router.refresh();
    } catch (err) {
      toast.error(err?.data?.message || "Login failed");
    }
  };

  const onRegister = async (data) => {
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
      gender: data.gender,
      dob: data.dob,
    };

    console.log(payload, "user data.........");

    try {
      const res = await sendSignupOtp(payload).unwrap();
      toast.success("OTP sent to your email");
      setView("signup-verification");
      setForgotEmail(payload.email); // store email for OTP verification
      setTempUser(payload); // ⭐ store temp signup data (name/password etc.)
    } catch (err) {
      toast.error(err?.data?.message || "Failed to send OTP");
    }
  };

  // const onRegister = async (data) => {
  //   const payload = {
  //     name: data.name,
  //     email: data.email,
  //     password: data.password,
  //     // photo: data.photo || "https://i.pravatar.cc/150",
  //     gender: data.gender,
  //     dob: new Date(data.dob).toISOString(),
  //   };

  //   try {
  //     const res = await registerUser(payload).unwrap();
  //     dispatch(setCredentials(res));
  //     toast.success("Signup successfully");
  //     dispatch(staticApi.util.invalidateTags(["Statics"]));
  //   } catch (err) {
  //     toast.error(err?.data?.message || "Register failed");
  //     console.log(err);
  //   }
  // };

  const onForgot = async (data) => {
    try {
      const res = await sendOtp({ email: data.email }).unwrap();
      if (res.success) {
        setForgotEmail(data.email);
        setView("verification");
      } else {
        alert(res.message);
      }
    } catch (error) {
      alert(error.data?.message || "Something went wrong");
    }
  };

  const onVerifyOtp = async (data) => {
    try {
      const res = await resetPassword(data).unwrap();
      if (res.success) {
        toast.success("OTP verified");
      } else {
        toast.success(res.error);
      }
      setView("login"); // ya password reset page pe bhejo
    } catch (error) {
      console.log("OTP verification failed!");
    }
    // 🔹 Yahan backend se OTP verify karna hai
  };

  const handleResend = async () => {
    if (!forgotEmail) return toast.error("Email not found");

    try {
      await sendOtp({ email: forgotEmail }).unwrap();
      toast.success("OTP resent successfully");

      setResendDisabled(true);
      setCountdown(60);

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to resend OTP");
      setResendDisabled(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 max-sm:px-5">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md mb-20">
        {/* ---------------- LOGIN ---------------- */}
        {view === "login" && (
          <>
            <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
            <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  {...loginRegister("email")}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
                />
                {loginErrors.email && (
                  <p className="text-red-500 text-sm">
                    {loginErrors.email.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Password"
                  {...loginRegister("password")}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
                />
                {loginErrors.password && (
                  <p className="text-red-500 text-sm">
                    {loginErrors.password.message}
                  </p>
                )}
              </div>

              <div
                className="text-xs cursor-pointer text-gray-900 hover:text-yellow-600"
                onClick={() => setView("forgot")}
              >
                Forgot password?
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-yellow-500 text-white py-2.5 text-sm rounded-lg hover:bg-yellow-600 cursor-pointer"
              >
                {loginLoading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="text-sm text-center mt-3">
              Don’t have an account?{" "}
              <button
                className=" hover:text-yellow-600 underline cursor-pointer"
                onClick={() => setView("register")}
              >
                Register
              </button>
            </p>
          </>
        )}

        {/* ---------------- REGISTER ---------------- */}
        {view === "register" && (
          <>
            <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
            <form
              onSubmit={handleRegisterSubmit(onRegister)}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Username"
                {...regRegister("name")}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
              />
              {regErrors.name && (
                <p className="text-red-500 text-sm">{regErrors.name.message}</p>
              )}

              <input
                type="email"
                placeholder="Email"
                {...regRegister("email")}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
              />
              {regErrors.email && (
                <p className="text-red-500 text-sm">
                  {regErrors.email.message}
                </p>
              )}

              <input
                type="password"
                placeholder="Password"
                {...regRegister("password")}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
              />
              {regErrors.password && (
                <p className="text-red-500 text-sm">
                  {regErrors.password.message}
                </p>
              )}

              <input
                type="date"
                {...regRegister("dob")}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
              />
              <p className="text-xs text-gray-600">Enter your date of birth</p>
              {regErrors.dob && (
                <p className="text-red-500 text-sm">{regErrors.dob.message}</p>
              )}

              <select
                {...regRegister("gender")}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {regErrors.gender && (
                <p className="text-red-500 text-sm">
                  {regErrors.gender.message}
                </p>
              )}

              {/* <input
                type="url"
                placeholder="Photo URL"
                {...regRegister("photo")}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
              />
              {regErrors.photo && (
                <p className="text-red-500 text-sm">
                  {regErrors.photo.message}
                </p>
              )} */}

              <button
                type="submit"
                disabled={regLoading}
                className="w-full bg-yellow-500 text-white py-2.5 text-sm rounded-lg hover:bg-yellow-600 cursor-pointer"
              >
                {regLoading ? "Creating..." : "Register"}
              </button>
            </form>

            <p className="text-sm text-center mt-3">
              Already have an account?{" "}
              <button
                className="hover:text-yellow-600 cursor-pointer  underline"
                onClick={() => setView("login")}
              >
                Login
              </button>
            </p>
          </>
        )}

        {view === "signup-verification" && (
          <>
            <h2 className="text-xl font-bold mb-4 text-center">
              Verify Signup OTP
            </h2>

            <form
              onSubmit={handleSignupOtpSubmit(onSignupVerifyOtp)}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Enter OTP"
                {...signupOtpRegister("otp")}
                className="w-full border px-4 py-2 rounded-lg"
              />

              <button
                type="submit"
                className="w-full bg-yellow-500 text-white py-2 rounded-lg"
              >
                Verify OTP
              </button>
            </form>
          </>
        )}

        {/* ---------------- FORGOT PASSWORD ---------------- */}
        {view === "forgot" && (
          <>
            <h2 className="text-xl font-bold mb-4 text-center">
              Forgot Password
            </h2>
            <form onSubmit={handleForgotSubmit(onForgot)} className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                {...forgotRegister("email")}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
              />
              {forgotErrors.email && (
                <p className="text-red-500 text-sm">
                  {forgotErrors.email.message}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-yellow-500 text-white py-2.5 text-sm rounded-lg hover:bg-yellow-600 cursor-pointer"
              >
                Send OTP
              </button>
            </form>

            <p className="text-sm text-center mt-3">
              Back to{" "}
              <button
                className="hover:text-yellow-600 underline cursor-pointer"
                onClick={() => setView("login")}
              >
                Login
              </button>
            </p>
          </>
        )}

        {/* ---------------- OTP VERIFICATION ---------------- */}
        {view === "verification" && (
          <>
            <h2 className="text-xl font-bold mb-4 text-center">Verify OTP</h2>
            <form onSubmit={handleOtpSubmit(onVerifyOtp)} className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                {...otpRegister("email")}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
              />
              {otpErrors.email && (
                <p className="text-red-500 text-sm">
                  {otpErrors.email.message}
                </p>
              )}
              <input
                type="text"
                placeholder="Enter OTP"
                {...otpRegister("resetOtp")}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
              />
              {otpErrors.otp && (
                <p className="text-red-500 text-sm">{otpErrors.otp.message}</p>
              )}
              <input
                type="password"
                placeholder="Enter your password"
                {...otpRegister("newPassword")}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
              />
              {otpErrors.password && (
                <p className="text-red-500 text-sm">
                  {otpErrors.password.message}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-yellow-500 text-white py-2.5 text-sm rounded-lg hover:bg-yellow-600 cursor-pointer"
              >
                Verify
              </button>
            </form>

            <p className="text-sm text-center mt-3">
              Didn’t get OTP?{" "}
              <button
                className="text-blue-600 underline disabled:opacity-50 cursor-pointer"
                disabled={resendDisabled || sendOtpLoading}
                onClick={handleResend}
              >
                {resendDisabled ? `Resend in ${countdown}s` : "Resend"}
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
