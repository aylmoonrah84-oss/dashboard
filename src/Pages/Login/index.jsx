import { useState } from "react";
import logo from "../../assets/logo.png";

const Login = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(fields);
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen w-full bg-[#0A0E1A] flex items-center justify-center px-4 relative overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(#8A93AB_1px,transparent_1px),linear-gradient(90deg,#8A93AB_1px,transparent_1px)] bg-[size:48px_48px]" />

      {/* Purple Glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#6C5CE7] rounded-full blur-[120px] opacity-20" />

      {/* Cyan Glow */}
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#00D9FF] rounded-full blur-[120px] opacity-20" />

      {/* Login Card */}
      <div className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-[#131826]/80 backdrop-blur-xl shadow-2xl p-8">

        {/* Logo + Title */}
        <div className="text-center mb-8">

          <img
            src={logo}
            alt="Pixion Tech"
            className="mx-auto mb-6 w-40 h-auto object-contain"
          />

          <h1 className="text-xl font-bold text-[#EDEFF7]">
            ورود مدیر
          </h1>

          <p className="text-sm text-[#8A93AB] mt-2">
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
              className="w-full text-right rounded-lg bg-[#0A0E1A] border border-white/10 text-[#EDEFF7] placeholder:text-[#8A93AB]/50 px-4 py-2.5 text-sm outline-none transition focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/30"
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
              className="w-full text-right rounded-lg bg-[#0A0E1A] border border-white/10 text-[#EDEFF7] placeholder:text-[#8A93AB]/50 px-4 py-2.5 text-sm outline-none transition focus:border-[#00D9FF] focus:ring-2 focus:ring-[#00D9FF]/30"
            />

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-2 rounded-lg bg-gradient-to-l from-[#6C5CE7] to-[#00D9FF] text-white text-sm font-semibold py-2.5 shadow-lg shadow-[#6C5CE7]/20 transition hover:shadow-[#00D9FF]/30 hover:brightness-110 active:scale-[0.98]"
          >
            ورود
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;