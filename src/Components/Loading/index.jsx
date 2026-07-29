export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0A0E1A] flex items-center justify-center">
      <div className="relative w-24 h-24">

        {/* Outer glow */}
        <div className="absolute inset-0 rounded-full bg-[#00D9FF]/10 blur-2xl" />

        {/* Glass background */}
        <div className="absolute inset-2 rounded-full bg-[#131826]/80 border border-[#6C5CE7]/20 backdrop-blur-xl" />

        {/* Spinner */}
        <div
          className="
            absolute inset-0
            rounded-full
            border-[3px]
            border-transparent
            border-t-[#6C5CE7]
            border-r-[#00D9FF]
            animate-spin
            shadow-[0_0_20px_#6C5CE7,0_0_35px_#00D9FF]
          "
        />

        {/* Inner ring */}
        <div
          className="
            absolute inset-5
            rounded-full
            border
            border-[#00D9FF]/20
            animate-[spin_2s_linear_infinite_reverse]
          "
        />

        {/* Center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-[#00D9FF] shadow-[0_0_12px_#00D9FF,0_0_25px_#00D9FF]" />
        </div>
      </div>
    </div>
  );
}