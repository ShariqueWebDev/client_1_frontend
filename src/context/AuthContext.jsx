// "use client";

// import React, {
//   createContext,
//   useContext,
//   useState,
//   useMemo,
//   useEffect,
// } from "react";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   updateProfile,
//   signOut,
//   signInWithPopup,
//   onAuthStateChanged,
//   sendPasswordResetEmail,
// } from "firebase/auth";
// import { useRouter } from "next/navigation";
// import { auth, googleProvider } from "@/firebase/config";

// const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [view, setView] = useState("login"); // 'login' | 'register' | 'forgot'
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const initialState = {
//     user: null,
//     isAuthenticated: false,
//     loading: false,
//   };
//   // keep auth state in sync
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });
//     return () => unsubscribe();
//   }, []);

//   // ====== UI Controls ======
//   const openLogin = () => {
//     setView("login");
//     setIsOpen(true);
//   };
//   const openRegister = () => {
//     setView("register");
//     setIsOpen(true);
//   };
//   const openForgot = () => {
//     setView("forgot");
//     setIsOpen(true);
//   };
//   const closeAuth = () => setIsOpen(false);

//   // ====== Firebase Auth Functions ======
//   // Login
//   const signIn = async ({ emailOrUsername, password }) => {
//     setLoading(true);
//     try {
//       const res = await signInWithEmailAndPassword(
//         auth,
//         emailOrUsername,
//         password
//       );
//       setUser(res.user);
//       alert("Logged in successfully!");
//       closeAuth();
//       router.push("/"); // ✅ Redirect to home
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Register
//   const signUp = async ({ username, email, password }) => {
//     setLoading(true);
//     try {
//       const res = await createUserWithEmailAndPassword(auth, email, password);
//       await updateProfile(res.user, { displayName: username });
//       setUser(res.user);
//       alert("Account created!");
//       closeAuth();
//       router.push("/"); // ✅ Redirect to home
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Google Login
//   const signInWithGoogle = async () => {
//     setLoading(true);
//     try {
//       const res = await signInWithPopup(auth, googleProvider);
//       setUser(res.user);
//       closeAuth();
//       router.push("/"); // ✅ Redirect to home
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Forgot Password
//   const sendReset = async (email) => {
//     setLoading(true);
//     try {
//       await sendPasswordResetEmail(auth, email);
//       alert("Password reset email sent!");
//       setView("login");
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Logout
//   const logOut = async () => {
//     try {
//       await signOut(auth);
//       setUser(null);
//       router.push("/"); // ✅ Go back to home
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const value = useMemo(
//     () => ({
//       isOpen,
//       view,
//       user,
//       loading,
//       openLogin,
//       openRegister,
//       openForgot,
//       closeAuth,
//       signIn,
//       signUp,
//       signInWithGoogle,
//       sendReset,
//       logOut,
//     }),
//     [isOpen, view, user, loading]
//   );

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export const useAuth = () => useContext(AuthContext);
