// "use client";

// import React, { useState } from "react";
// import { useAuth } from "@/context/AuthContext";

// export default function AuthModal() {
//   const {
//     isOpen,
//     view,
//     loading,
//     openLogin,
//     openRegister,
//     openForgot,
//     closeAuth,
//     signIn,
//     signUp,
//     sendResetOtp,
//     verifyOtpAndReset,
//     resetEmail,
//   } = useAuth();

//   const [loginForm, setLoginForm] = useState({
//     emailOrUsername: "",
//     password: "",
//   });
//   const [registerForm, setRegisterForm] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirm: "",
//   });
//   const [forgotEmail, setForgotEmail] = useState("");
//   const [otp, setOtp] = useState("");

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-[100]">
//       {/* Overlay */}
//       <div
//         className="absolute inset-0 bg-black/50"
//         onClick={closeAuth}
//         aria-hidden="true"
//       />
//       {/* Panel */}
//       <div className="absolute left-1/2 top-1/2 w-[95%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl">
//         {/* Header */}
//         <div className="mb-4 flex items-center justify-between">
//           <h2 className="text-xl font-semibold text-gray-800">
//             {view === "login" && "Login"}
//             {view === "register" && "Create Account"}
//             {view === "forgot" && "Forgot Password"}
//             {view === "otp" && "Verify OTP"}
//           </h2>
//           <button
//             onClick={closeAuth}
//             className="rounded-md px-2 py-1 text-gray-500 hover:bg-gray-100"
//             aria-label="Close"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Body */}
//         {view === "login" && (
//           <form
//             className="space-y-4"
//             onSubmit={(e) => {
//               e.preventDefault();
//               signIn(loginForm);
//             }}
//           >
//             <div>
//               <label className="text-sm text-gray-600">Email or Username</label>
//               <input
//                 type="text"
//                 className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring"
//                 value={loginForm.emailOrUsername}
//                 onChange={(e) =>
//                   setLoginForm({
//                     ...loginForm,
//                     emailOrUsername: e.target.value,
//                   })
//                 }
//                 required
//               />
//             </div>
//             <div>
//               <label className="text-sm text-gray-600">Password</label>
//               <input
//                 type="password"
//                 className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring"
//                 value={loginForm.password}
//                 onChange={(e) =>
//                   setLoginForm({ ...loginForm, password: e.target.value })
//                 }
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full rounded-lg bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
//             >
//               {loading ? "Signing in..." : "Login"}
//             </button>

//             <div className="flex items-center justify-between text-sm">
//               <button
//                 type="button"
//                 onClick={openRegister}
//                 className="text-blue-600 hover:underline"
//               >
//                 Create an account
//               </button>
//               <button
//                 type="button"
//                 onClick={openForgot}
//                 className="text-blue-600 hover:underline"
//               >
//                 Forgot password?
//               </button>
//             </div>

//             <div className="pt-2">
//               <button
//                 type="button"
//                 onClick={() => alert("TODO: Firebase Google Sign-In")}
//                 className="w-full rounded-lg border py-2 font-medium hover:bg-gray-50"
//               >
//                 Continue with Google
//               </button>
//             </div>
//           </form>
//         )}

//         {view === "register" && (
//           <form
//             className="space-y-4"
//             onSubmit={(e) => {
//               e.preventDefault();
//               if (registerForm.password !== registerForm.confirm) {
//                 alert("Passwords do not match");
//                 return;
//               }
//               signUp({
//                 username: registerForm.username.trim(),
//                 email: registerForm.email.trim(),
//                 password: registerForm.password,
//               });
//             }}
//           >
//             <div>
//               <label className="text-sm text-gray-600">Username</label>
//               <input
//                 type="text"
//                 className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring"
//                 value={registerForm.username}
//                 onChange={(e) =>
//                   setRegisterForm({ ...registerForm, username: e.target.value })
//                 }
//                 required
//               />
//             </div>
//             <div>
//               <label className="text-sm text-gray-600">Email</label>
//               <input
//                 type="email"
//                 className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring"
//                 value={registerForm.email}
//                 onChange={(e) =>
//                   setRegisterForm({ ...registerForm, email: e.target.value })
//                 }
//                 required
//               />
//             </div>
//             <div>
//               <label className="text-sm text-gray-600">Password</label>
//               <input
//                 type="password"
//                 className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring"
//                 value={registerForm.password}
//                 onChange={(e) =>
//                   setRegisterForm({ ...registerForm, password: e.target.value })
//                 }
//                 required
//                 minLength={6}
//               />
//             </div>
//             <div>
//               <label className="text-sm text-gray-600">Confirm Password</label>
//               <input
//                 type="password"
//                 className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring"
//                 value={registerForm.confirm}
//                 onChange={(e) =>
//                   setRegisterForm({ ...registerForm, confirm: e.target.value })
//                 }
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full rounded-lg bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
//             >
//               {loading ? "Creating..." : "Register"}
//             </button>

//             <div className="text-center text-sm">
//               <button
//                 type="button"
//                 onClick={openLogin}
//                 className="text-blue-600 hover:underline"
//               >
//                 Already have an account? Login
//               </button>
//             </div>
//           </form>
//         )}

//         {view === "forgot" && (
//           <form
//             className="space-y-4"
//             onSubmit={(e) => {
//               e.preventDefault();
//               sendResetOtp(forgotEmail.trim());
//             }}
//           >
//             <div>
//               <label className="text-sm text-gray-600">Enter your email</label>
//               <input
//                 type="email"
//                 className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring"
//                 value={forgotEmail}
//                 onChange={(e) => setForgotEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full rounded-lg bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
//             >
//               {loading ? "Sending OTP..." : "Send OTP"}
//             </button>
//             <div className="text-center text-sm">
//               <button
//                 type="button"
//                 onClick={openLogin}
//                 className="text-blue-600 hover:underline"
//               >
//                 Back to Login
//               </button>
//             </div>
//           </form>
//         )}

//         {view === "otp" && (
//           <form
//             className="space-y-4"
//             onSubmit={(e) => {
//               e.preventDefault();
//               verifyOtpAndReset(otp.trim());
//             }}
//           >
//             <p className="text-sm text-gray-600">
//               We sent a 6-digit code to{" "}
//               <span className="font-medium">{resetEmail}</span>.
//             </p>
//             <input
//               type="text"
//               inputMode="numeric"
//               maxLength={6}
//               className="w-full rounded-lg border px-3 py-2 tracking-widest text-center outline-none focus:ring"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
//               placeholder="••••••"
//               required
//             />
//             <button
//               type="submit"
//               className="w-full rounded-lg bg-blue-600 py-2 font-medium text-white hover:bg-blue-700"
//             >
//               Verify OTP
//             </button>
//             <div className="text-center text-sm">
//               <button
//                 type="button"
//                 onClick={openForgot}
//                 className="text-blue-600 hover:underline"
//               >
//                 Change email
//               </button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }
