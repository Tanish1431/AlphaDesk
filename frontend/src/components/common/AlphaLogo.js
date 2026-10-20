import React from "react";

export default function AlphaLogo({ size = 32, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <defs>
        {/* Deep luxury Tycoon metallic sapphire & gold gradient */}
        <linearGradient id="tycoonShield" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E3A8A" />
          <stop offset="50%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="goldAscent" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#FDE68A" />
        </linearGradient>
        <linearGradient id="alphaWing" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#93C5FD" />
        </linearGradient>
        <filter id="subtleGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#1e3a8a" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Outer Hexagon / Shield for Prestige & Security */}
      <rect
        x="2"
        y="2"
        width="44"
        height="44"
        rx="10"
        fill="url(#tycoonShield)"
        filter="url(#subtleGlow)"
      />

      {/* Inner geometric apex line / border */}
      <rect
        x="3"
        y="3"
        width="42"
        height="42"
        rx="9"
        fill="none"
        stroke="rgba(255, 255, 255, 0.15)"
        strokeWidth="1.2"
      />

      {/* The Tycoon Alpha Apex Monogram */}
      {/* Left upward pillar */}
      <path
        d="M24 10L12 36H18L24 21L30 36H36L24 10Z"
        fill="white"
        fillOpacity="0.95"
      />

      {/* Precision golden Chevron crossbar symbolizing exponential capital growth */}
      <path
        d="M16 28L24 22L32 28L29 30L24 26L19 30L16 28Z"
        fill="url(#goldAscent)"
      />

      {/* Floating Crown / Apex Diamond */}
      <polygon
        points="24,7 26.5,10 24,13 21.5,10"
        fill="url(#goldAscent)"
      />
    </svg>
  );
}
