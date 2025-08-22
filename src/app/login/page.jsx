"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
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
  photo: z.string().url("Invalid photo URL"),
});

export default function LoginRegisterPage() {
  const [view, setView] = useState("login");
  const router = useRouter();
  const dispatch = useDispatch();

  // 🔹 Redux RTK Query Mutations
  const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();
  const [registerUser, { isLoading: regLoading }] = useRegisterUserMutation();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        router.push("/dashboard"); // admin redirect
      } else if (user.role === "user") {
        router.push("/"); // normal user redirect
      } else {
        router.push("/login"); // fallback, agar role unexpected ho
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

  // Login Handler
  const onLogin = async (data) => {
    try {
      const res = await loginUser(data).unwrap(); // unwrap -> direct response
      dispatch(setCredentials(res));
      toast.success("Login success");
      console.log("Login success:", res);
    } catch (err) {
      toast.error("Login failed");
    }
  };

  // Register Handler
  const onRegister = async (data) => {
    const payload = {
      name: data.name, // 👈 username mat bhejna, "name" bhejna
      email: data.email,
      password: data.password,
      photo: data.photo || "https://i.pravatar.cc/150", // agar tum file upload nahi kar rahe ho
      gender: data.gender, // sirf "male" ya "female" hona chahiye
      dob: new Date(data.dob).toISOString(), // 👈 Date ko ISO string me convert karke bhejna
    };

    console.log("Register payload:", payload);

    try {
      const res = await registerUser(payload).unwrap();
      console.log("Register success:", res);
      dispatch(setCredentials(res));
      toast.success(`Signup successfully`);

      // Dashboard mein data automatic update karne keliye
      dispatch(staticApi.util.invalidateTags(["Statics"]));
    } catch (err) {
      console.log("Register error:", err);
      alert(err.data?.message || "Register failed");
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
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm  focus:outline-none "
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
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm  focus:outline-none"
                />
                {loginErrors.password && (
                  <p className="text-red-500 text-sm">
                    {loginErrors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-yellow-500 text-white py-2.5 text-sm rounded-lg hover:bg-yellow-600 cursor-pointer"
                onClick={() => {
                  if (user.role === "user") {
                    router.push("/");
                  } else if (!user.role === "admin") {
                    router.push("/dashboard");
                  }
                }}
              >
                {loginLoading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="text-sm text-center mt-3">
              Don’t have an account?{" "}
              <button
                className="text-blue-600 underline cursor-pointer hover:text-blue-800"
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
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm  focus:outline-none"
              />
              {regErrors.name && (
                <p className="text-red-500 text-sm">{regErrors.name.message}</p>
              )}

              <input
                type="email"
                placeholder="Email"
                {...regRegister("email")}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm  focus:outline-none"
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
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm  focus:outline-none"
              />
              {regErrors.password && (
                <p className="text-red-500 text-sm">
                  {regErrors.password.message}
                </p>
              )}

              <input
                type="date"
                {...regRegister("dob")}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm  focus:outline-none"
              />
              {regErrors.dob && (
                <p className="text-red-500 text-sm">{regErrors.dob.message}</p>
              )}

              <select
                {...regRegister("gender")}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm  focus:outline-none"
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

              <input
                type="url"
                placeholder="Photo URL"
                {...regRegister("photo")}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm  focus:outline-none"
              />
              {regErrors.photo && (
                <p className="text-red-500 text-sm">
                  {regErrors.photo.message}
                </p>
              )}

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
                className="text-blue-600 underline cursor-pointer hover:text-blue-800"
                onClick={() => setView("login")}
              >
                Login
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
