import React from 'react'

export default function BarsIcon({className}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`size-6 ${className}`}
      
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75H14.5M3.75 12H20.25M11.5 17.25H20.25M17.5 6.75H20.25M8.5 17.25H3.75"
      />
    </svg>
  );
}
