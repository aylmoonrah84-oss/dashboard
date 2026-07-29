import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/logo.png";
import { login } from "../../Store/Slices/AuthSlice";
import fetchData from "../../Utils/fetchData";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fields, setFields] = useState({
    phoneNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await fetchData("auth/login-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });

    console.log(data);

    if (data.success) {
      dispatch(
        login({
          token: data.data.token,
          user: data.data.user,
        })
      );

      navigate("/dashboard");
    }
  };

  return (
    <div
      dir="rtl"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0A0E1A] px-4"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(#8A93AB_1px,transparent_1px),linear-gradient(90deg,#8A93AB_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.07]" />

      {/* Purple Glow */}
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#6C5CE7] opacity-20 blur-[120px]" />

      {/* Cyan Glow */}
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#00D9FF] opacity-20 blur-[120px]" />

      {/* Login Card */}
      <div className="relative w-full max-w-sm rounded-2xl border border-[#6C5CE7]/15 bg-[#131826]/80 p-8 shadow-[0_0_50px_rgba(108,92,231,0.08)] backdrop-blur-xl">

        {/* Logo + Title */}
        <div className="mb-8 text-center">

          <img
            src={logo}
            alt="Pixion Tech"
            className="mx-auto mb-6 h-auto w-40 object-contain"
          />

          <h1 className="text-xl font-bold text-[#EDEFF7]">
            ورود مدیر
          </h1>

          <p className="mt-2 text-sm text-[#8A93AB]">
            برای دسترسی به داشبورد، اطلاعات خود را وارد کنید
          </p>

        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Phone Number */}
          <div className="space-y-1.5">

            <label
              htmlFor="phoneNumber"
              className="text-xs font-medium text-[#8A93AB]"
            >
              شماره موبایل
            </label>

            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              value={fields.phoneNumber}
              onChange={handleChange}
              placeholder="09xxxxxxxxx"
              dir="ltr"
              className="w-full rounded-lg border border-white/10 bg-[#0A0E1A] px-4 py-2.5 text-right text-sm text-[#EDEFF7] outline-none transition placeholder:text-[#8A93AB]/50 focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/30"
            />

          </div>

          {/* Password */}
          <div className="space-y-1.5">

            <label
              htmlFor="password"
              className="text-xs font-medium text-[#8A93AB]"
            >
              رمز عبور
            </label>

            <input
              type="password"
              name="password"
              id="password"
              value={fields.password}
              onChange={handleChange}
              placeholder="******"
              dir="ltr"
              className="w-full rounded-lg border border-white/10 bg-[#0A0E1A] px-4 py-2.5 text-right text-sm text-[#EDEFF7] outline-none transition placeholder:text-[#8A93AB]/50 focus:border-[#00D9FF] focus:ring-2 focus:ring-[#00D9FF]/30"
            />

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-gradient-to-l from-[#6C5CE7] to-[#00D9FF] py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#6C5CE7]/20 transition hover:brightness-110 hover:shadow-[#00D9FF]/30 active:scale-[0.98]"
          >
            ورود
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;