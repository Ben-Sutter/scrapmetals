import React from "react";

const HomePage = () => (
  <div className="fixed inset-0 overflow-hidden">
    {/* custom font + keyframes + utility helpers */}
    <style>{`
      @font-face {
        font-family: 'CustomFont';
        src: url('/fonts/CloisterBlack.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
      }
      @keyframes driftBackground {
        0%   { transform: scale(1.1); }
        50%  { transform: scale(2) rotate(22.5deg); }
        100% { transform: scale(1.1); }
      }
      @keyframes rotateBackground {
        0%   { transform: scale(1.1); }
        50%  { transform: scale(2.5) rotate(45deg); }
        100% { transform: scale(1.1); }
      }

      /* Tailwind-friendly helpers for the keyframes above */
      .animate-drift   { animation: driftBackground 40s infinite ease-in-out; }
      .animate-rotate  { animation: rotateBackground 40s infinite linear;     }

      /* custom text shadow utility */
      .text-glow { filter: drop-shadow(10px 10px 5px rgba(0,0,0,0.7)); }
    `}</style>

    {/* background image */}
    <img
      src="/images/greenBG.jpg"
      alt="Background"
      className="
        absolute inset-0 -z-10 h-full w-full object-cover
        animate-drift
        max-[768px]:animate-rotate
      "
    />

    {/* headline */}
    <h1 className="
    absolute right-4 sm:right-10 top-1/2 -translate-y-1/2
    font-[CustomFont] text-[20vw] sm:text-[12vw] lg:text-[10rem]
    font-extrabold leading-none tracking-tight
    text-right text-white text-glow select-none
  "
    >
      Scrap<span className="block sm:inline">&nbsp;Metals</span>
    </h1>
  </div>
);

export default HomePage;
