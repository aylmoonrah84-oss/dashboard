import React from "react";
import {
  FaArrowUp,
  FaArrowDown,
  FaShoppingBag,
  FaUsers,
  FaBoxOpen,
  FaMoneyBillWave,
  FaClock,
  FaCheckCircle,
  FaTruck,
  FaTimesCircle,
  FaChartLine,
} from "react-icons/fa";

export default function Home() {
  const stats = [
    {
      title: "فروش کل",
      value: "$24,580",
      change: "+12.5%",
      positive: true,
      icon: <FaMoneyBillWave />,
      iconColor: "text-[#6C5CE7]",
      iconBg: "bg-[#6C5CE7]/10",
    },
    {
      title: "سفارشات",
      value: "1,248",
      change: "+8.2%",
      positive: true,
      icon: <FaShoppingBag />,
      iconColor: "text-[#00D9FF]",
      iconBg: "bg-[#00D9FF]/10",
    },
    {
      title: "کاربران",
      value: "8,549",
      change: "+15.8%",
      positive: true,
      icon: <FaUsers />,
      iconColor: "text-[#6C5CE7]",
      iconBg: "bg-[#6C5CE7]/10",
    },
    {
      title: "محصولات",
      value: "356",
      change: "-2.4%",
      positive: false,
      icon: <FaBoxOpen />,
      iconColor: "text-[#00D9FF]",
      iconBg: "bg-[#00D9FF]/10",
    },
  ];

  const salesData = [
    { month: "فروردین", value: 42 },
    { month: "اردیبهشت", value: 58 },
    { month: "خرداد", value: 48 },
    { month: "تیر", value: 72 },
    { month: "مرداد", value: 64 },
    { month: "شهریور", value: 86 },
    { month: "مهر", value: 76 },
    { month: "آبان", value: 94 },
    { month: "آذر", value: 82 },
    { month: "دی", value: 100 },
    { month: "بهمن", value: 91 },
    { month: "اسفند", value: 108 },
  ];

  const orders = [
    {
      id: "#PX-1048",
      customer: "سارا محمدی",
      product: "Premium Hoodie",
      amount: "$129",
      status: "تکمیل شده",
      statusType: "success",
    },
    {
      id: "#PX-1047",
      customer: "علی رضایی",
      product: "Classic Sneakers",
      amount: "$185",
      status: "در حال ارسال",
      statusType: "shipping",
    },
    {
      id: "#PX-1046",
      customer: "نگار احمدی",
      product: "Urban Jacket",
      amount: "$240",
      status: "در انتظار",
      statusType: "pending",
    },
    {
      id: "#PX-1045",
      customer: "محمد کریمی",
      product: "Oversized T-Shirt",
      amount: "$75",
      status: "لغو شده",
      statusType: "cancelled",
    },
    {
      id: "#PX-1044",
      customer: "آرزو حسینی",
      product: "Leather Bag",
      amount: "$210",
      status: "تکمیل شده",
      statusType: "success",
    },
  ];

  const activities = [
    {
      title: "سفارش جدید ثبت شد",
      description: "سفارش #PX-1048 توسط سارا محمدی",
      time: "۵ دقیقه پیش",
      icon: <FaShoppingBag />,
    },
    {
      title: "کاربر جدید ثبت‌نام کرد",
      description: "علی رضایی به کاربران اضافه شد",
      time: "۱۸ دقیقه پیش",
      icon: <FaUsers />,
    },
    {
      title: "محصول جدید اضافه شد",
      description: "Premium Hoodie به فروشگاه اضافه شد",
      time: "۴۵ دقیقه پیش",
      icon: <FaBoxOpen />,
    },
    {
      title: "سفارش ارسال شد",
      description: "سفارش #PX-1047 تحویل پست شد",
      time: "۱ ساعت پیش",
      icon: <FaTruck />,
    },
  ];

  const statusStyles = {
    success: {
      className: "bg-emerald-400/10 text-emerald-400",
      icon: <FaCheckCircle />,
    },
    shipping: {
      className: "bg-[#00D9FF]/10 text-[#00D9FF]",
      icon: <FaTruck />,
    },
    pending: {
      className: "bg-amber-400/10 text-amber-400",
      icon: <FaClock />,
    },
    cancelled: {
      className: "bg-red-400/10 text-red-400",
      icon: <FaTimesCircle />,
    },
  };

  return (
    <div
      dir="rtl"
      className="w-full min-w-0 overflow-hidden text-[#EDEFF7]"
    >
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#00D9FF] shadow-[0_0_10px_#00D9FF]" />

            <span className="text-xs font-medium text-[#00D9FF]">
              سیستم آنلاین است
            </span>
          </div>

          <h1 className="truncate text-2xl font-bold text-[#EDEFF7] md:text-3xl">
            داشبورد مدیریت
          </h1>

          <p className="mt-2 truncate text-sm text-[#8A93AB]">
            نمای کلی عملکرد فروشگاه و فعالیت‌های اخیر
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            className="rounded-xl border border-white/10 bg-[#131826]/70 px-4 py-2.5 text-sm text-[#8A93AB] transition hover:border-[#6C5CE7]/30 hover:text-[#EDEFF7]"
          >
            امروز
          </button>

          <button
            type="button"
            className="rounded-xl bg-gradient-to-l from-[#6C5CE7] to-[#00D9FF] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#6C5CE7]/20 transition hover:brightness-110"
          >
            گزارش عملکرد
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="relative min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#131826]/70 p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#6C5CE7]/30"
          >
            <div className="absolute -left-10 -top-10 h-28 w-28 rounded-full bg-[#6C5CE7]/5 blur-3xl" />

            <div className="relative flex min-w-0 items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm text-[#8A93AB]">
                  {stat.title}
                </p>

                <h2 className="mt-3 truncate text-2xl font-bold text-[#EDEFF7]">
                  {stat.value}
                </h2>

                <div className="mt-3 flex min-w-0 items-center gap-2">
                  <span
                    className={`flex shrink-0 items-center gap-1 text-xs font-semibold ${
                      stat.positive ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {stat.positive ? <FaArrowUp /> : <FaArrowDown />}
                    {stat.change}
                  </span>

                  <span className="truncate text-xs text-[#8A93AB]">
                    نسبت به ماه قبل
                  </span>
                </div>
              </div>

              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${stat.iconBg} ${stat.iconColor} text-lg`}
              >
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart + Summary */}
      <div className="mb-6 grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">

        {/* Chart */}
        <div className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#131826]/70 p-5 backdrop-blur-xl">
          <div className="mb-7 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h2 className="font-semibold text-[#EDEFF7]">
                آمار فروش
              </h2>

              <p className="mt-1 text-xs text-[#8A93AB]">
                میزان فروش در ۱۲ ماه گذشته
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2 text-xs text-[#00D9FF]">
              <FaChartLine />
              <span>+18.4%</span>
            </div>
          </div>

          <div className="relative h-64 min-w-0 overflow-hidden">

            {/* Grid */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {[100, 75, 50, 25, 0].map((value) => (
                <div
                  key={value}
                  className="flex min-w-0 items-center gap-3"
                >
                  <span className="w-7 shrink-0 text-[10px] text-[#8A93AB]">
                    {value}
                  </span>

                  <div className="h-px min-w-0 flex-1 bg-white/[0.05]" />
                </div>
              ))}
            </div>

            {/* Bars */}
            <div className="absolute inset-0 flex min-w-0 items-end justify-between gap-1 overflow-hidden pr-10 pt-4 sm:gap-2">
              {salesData.map((item) => (
                <div
                  key={item.month}
                  className="group flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"
                >
                  <div
                    className="relative w-full max-w-[28px] rounded-t-lg bg-gradient-to-t from-[#6C5CE7] to-[#00D9FF] opacity-70 transition-all duration-300 group-hover:opacity-100"
                    style={{
                      height: `${item.value}%`,
                    }}
                  >
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] text-[#8A93AB] opacity-0 transition group-hover:opacity-100">
                      {item.value}
                    </span>
                  </div>

                  <span className="text-[8px] text-[#8A93AB] sm:text-[9px]">
                    {item.month.slice(0, 2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#131826]/70 p-5 backdrop-blur-xl">
          <div className="mb-6">
            <h2 className="font-semibold text-[#EDEFF7]">
              خلاصه عملکرد
            </h2>

            <p className="mt-1 text-xs text-[#8A93AB]">
              وضعیت فعلی فروشگاه
            </p>
          </div>

          <div className="space-y-5">
            {[
              ["تکمیل سفارشات", "82%", "82%"],
              ["رضایت مشتری", "94%", "94%"],
              ["موجودی محصولات", "67%", "67%"],
            ].map(([title, value, width]) => (
              <div key={title}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs text-[#8A93AB]">
                    {title}
                  </span>

                  <span className="text-xs font-semibold text-[#EDEFF7]">
                    {value}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-[#0A0E1A]">
                  <div
                    className="h-full rounded-full bg-gradient-to-l from-[#6C5CE7] to-[#00D9FF]"
                    style={{ width }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-7 rounded-xl border border-[#00D9FF]/10 bg-[#00D9FF]/5 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#00D9FF]/10 text-[#00D9FF]">
                <FaChartLine />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#EDEFF7]">
                  رشد عالی
                </p>

                <p className="mt-1 text-[10px] leading-5 text-[#8A93AB]">
                  فروش این ماه بهتر از ماه گذشته است.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orders + Activities */}
      <div className="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">

        {/* Orders */}
        <div className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#131826]/70 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3 border-b border-white/5 px-5 py-5">
            <div className="min-w-0">
              <h2 className="font-semibold text-[#EDEFF7]">
                آخرین سفارشات
              </h2>

              <p className="mt-1 text-xs text-[#8A93AB]">
                آخرین تراکنش‌های فروشگاه
              </p>
            </div>

            <button
              type="button"
              className="shrink-0 text-xs font-medium text-[#00D9FF] transition hover:text-[#EDEFF7]"
            >
              مشاهده همه
            </button>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[650px] text-right">
              <thead>
                <tr className="border-b border-white/5 text-xs text-[#8A93AB]">
                  <th className="px-5 py-4 font-medium">سفارش</th>
                  <th className="px-5 py-4 font-medium">مشتری</th>
                  <th className="px-5 py-4 font-medium">محصول</th>
                  <th className="px-5 py-4 font-medium">مبلغ</th>
                  <th className="px-5 py-4 font-medium">وضعیت</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => {
                  const status = statusStyles[order.statusType];

                  return (
                    <tr
                      key={order.id}
                      className="border-b border-white/[0.04] transition hover:bg-white/[0.02]"
                    >
                      <td className="px-5 py-4 text-xs font-semibold text-[#6C5CE7]">
                        {order.id}
                      </td>

                      <td className="px-5 py-4 text-xs text-[#EDEFF7]">
                        {order.customer}
                      </td>

                      <td className="px-5 py-4 text-xs text-[#8A93AB]">
                        {order.product}
                      </td>

                      <td
                        className="px-5 py-4 text-xs font-semibold text-[#EDEFF7]"
                        dir="ltr"
                      >
                        {order.amount}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-medium ${status.className}`}
                        >
                          {status.icon}
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activities */}
        <div className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#131826]/70 p-5 backdrop-blur-xl">
          <div className="mb-6">
            <h2 className="font-semibold text-[#EDEFF7]">
              فعالیت‌های اخیر
            </h2>

            <p className="mt-1 text-xs text-[#8A93AB]">
              آخرین اتفاقات سیستم
            </p>
          </div>

          <div className="space-y-5">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="group flex min-w-0 gap-3"
              >
                <div className="relative shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#6C5CE7]/10 bg-[#6C5CE7]/10 text-sm text-[#6C5CE7] transition group-hover:border-[#00D9FF]/20 group-hover:bg-[#00D9FF]/10 group-hover:text-[#00D9FF]">
                    {activity.icon}
                  </div>

                  {index !== activities.length - 1 && (
                    <div className="absolute right-1/2 top-11 h-6 w-px translate-x-1/2 bg-white/5" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="truncate text-xs font-semibold text-[#EDEFF7]">
                      {activity.title}
                    </p>

                    <span className="shrink-0 text-[9px] text-[#8A93AB]">
                      {activity.time}
                    </span>
                  </div>

                  <p className="mt-1 truncate text-[10px] leading-5 text-[#8A93AB]">
                    {activity.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}