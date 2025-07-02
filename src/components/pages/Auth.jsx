import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (isLogin) {
        // LOGIN
        const res = await fetch("http://localhost/api/login.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        });

        const text = await res.text(); // ✅ get raw text
        console.log("[LOGIN] Raw response:", text); // ✅ helpful for debugging
        let resData;
        try {
          resData = JSON.parse(text); // ✅ try parsing manually
        } catch (e) {
          throw new Error("Invalid JSON response from login.php");
        }

        if (resData.success) {
          localStorage.setItem("user", JSON.stringify(resData.user));
          if (resData.user.role === "admin") navigate("/admin");
          else navigate("/customer");
        } else {
          alert(resData.message || "Login failed");
        }
      } else {
        // SIGNUP
        const res = await fetch("http://localhost/api/signup.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
          }),
        });

        const text = await res.text();
        console.log("[SIGNUP] Raw response:", text);
        let resData;
        try {
          resData = JSON.parse(text);
        } catch (e) {
          throw new Error("Invalid JSON response from signup.php");
        }

        if (resData.success) {
          // After successful signup, immediately log them in
          const loginRes = await fetch("http://localhost/api/login.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: data.email,
              password: data.password,
            }),
          });

          const loginText = await loginRes.text();
          console.log("[LOGIN after SIGNUP] Raw response:", loginText);
          let loginData;
          try {
            loginData = JSON.parse(loginText);
          } catch (e) {
            throw new Error(
              "Invalid JSON response from login.php after signup"
            );
          }

          if (loginData.success) {
            localStorage.setItem("user", JSON.stringify(loginData.user));
            if (loginData.user.role === "admin") navigate("/admin");
            else navigate("/customer");
          } else {
            alert(loginData.message || "Login after signup failed");
          }
        } else {
          alert(resData.message || "Signup failed");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
    // try {
    //   const res = await fetch("http://localhost/api/test.php", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ test: "hello" }),
    //   });
    //   const text = await res.text();
    //   console.log("[TEST] Raw response:", text);
    // } catch (error) {
    //   console.error("[TEST] Error:", error);
    // }
  };

  return (
    <motion.div
      className="max-w-md mx-auto p-8 bg-white rounded-3xl shadow-2xl mt-10 animate-fade-in"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-center mb-8 space-x-4">
        <button
          onClick={() => setIsLogin(true)}
          className={`px-5 py-2 text-lg font-semibold transition-all rounded-full ${
            isLogin
              ? "bg-rose-600 text-white shadow-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Log In
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`px-5 py-2 text-lg font-semibold transition-all rounded-full ${
            !isLogin
              ? "bg-rose-600 text-white shadow-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {!isLogin && (
          <div className="relative">
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className={`peer w-full border-b-2 p-3 focus:outline-none focus:border-rose-600 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder=" "
            />
            <label className="absolute left-3 top-3 text-gray-500 peer-focus:top-0 peer-focus:text-xs peer-focus:text-rose-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base transition-all">
              Your Name
            </label>
            {errors.name && (
              <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                <AlertCircle size={16} /> {errors.name.message}
              </p>
            )}
          </div>
        )}

        <div className="relative">
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className={`peer w-full border-b-2 p-3 focus:outline-none focus:border-rose-600 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder=" "
          />
          <label className="absolute left-3 top-3 text-gray-500 peer-focus:top-0 peer-focus:text-xs peer-focus:text-rose-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base transition-all">
            Email
          </label>
          {errors.email && (
            <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
              <AlertCircle size={16} /> {errors.email.message}
            </p>
          )}
        </div>

        <div className="relative">
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className={`peer w-full border-b-2 p-3 focus:outline-none focus:border-rose-600 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder=" "
          />
          <label className="absolute left-3 top-3 text-gray-500 peer-focus:top-0 peer-focus:text-xs peer-focus:text-rose-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base transition-all">
            Password
          </label>
          {errors.password && (
            <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
              <AlertCircle size={16} /> {errors.password.message}
            </p>
          )}
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-rose-600 to-pink-500 text-white py-3 rounded-full shadow hover:opacity-90 transition"
          type="submit"
        >
          {isLogin ? "Log In" : "Sign Up"}
        </motion.button>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-400 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="flex justify-center gap-4">
          <button
            type="button"
            className="border border-gray-300 rounded-full p-3 hover:bg-gray-100 transition"
            title="Coming Soon"
          >
            <img src="/google.svg" alt="Google" className="w-6 h-6" />
          </button>
          <button
            type="button"
            className="border border-gray-300 rounded-full p-3 hover:bg-gray-100 transition"
            title="Coming Soon"
          >
            <img src="/facebook.svg" alt="Facebook" className="w-6 h-6" />
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AuthPage;
