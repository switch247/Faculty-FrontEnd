"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = ({ role = "student" }) => {
  const { login } = useAuth();
  const router = useRouter();

  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({});
    setLoading(true);

    const formData = new FormData(event.target);
    const fields = Object.fromEntries(formData.entries());

    let newErrors = {};
    if (role === "Student") {
      if (!fields.rollNumber) newErrors.rollNumber = "Roll Number is required";
      if (!fields.studentName) newErrors.studentName = "Name is required";
    } else {
      if (!fields.email) newErrors.email = "Email is required";
    }
    if (!fields.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    login(fields, role);
  };

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-10 bg-white">
        <h2 className="text-3xl font-bold text-indigo-700 mb-2">{role} Login</h2>
        <p className="text-gray-600 mb-6">Welcome back! Please enter your details</p>

        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          {role === "Student" ? (
            <>
              <InputField
                label="Roll Number"
                name="rollNumber"
                type="number"
                error={errors.rollNumber}
              />
              <InputField
                label="Student Name"
                name="studentName"
                type="text"
                error={errors.studentName}
              />
            </>
          ) : (
            <InputField label="Email" name="email" type="email" error={errors.email} />
          )}

          <InputField
            label="Password"
            name="password"
            type={toggle ? "text" : "password"}
            error={errors.password}
            toggle={toggle}
            setToggle={setToggle}
          />

          <div className="flex justify-between items-center mt-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-gray-600 text-sm">Remember me</span>
            </label>
            <a href="#" className="text-indigo-600 text-sm">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded mt-4 hover:bg-indigo-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {role === "Admin" && (
            <div className="text-center mt-4">
              <span className="text-gray-600">Don't have an account?</span>
              <a href="/Adminregister" className="text-indigo-600 ml-2">Sign Up</a>
            </div>
          )}
        </form>
      </div>

      {/* Right Section (Background Image) */}
      <div className="hidden md:block md:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/designlogin.jpg')" }}></div>

      <ToastContainer />
    </div>
  );
};

export default LoginPage;

const InputField = ({ label, name, type, error, toggle, setToggle }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700">{label}</label>
      <div className="relative">
        <input
          type={type}
          name={name}
          className={`w-full px-3 py-2 border rounded ${error ? "border-red-500" : "border-gray-300"}`}
        />
        {name === "password" && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? "👁" : "🚫"}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};