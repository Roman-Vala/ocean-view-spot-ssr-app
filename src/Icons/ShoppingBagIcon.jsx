import React from 'react'

export default function ShoppingBagIcon({className}) {
  return (
    <svg
      width="20"
      height="25"
      viewBox="0 0 20 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M19.5 7.33026V19.5422C19.5 22.0275 17.4853 24.0422 15 24.0422H5C2.51472 24.0422 0.5 22.0275 0.5 19.5422V7.33026H19.5Z"
        stroke="currentColor"
      />
      <path
        d="M4.35425 10.9631C4.35425 10.9631 4.63519 0.883813 10.1774 1.00101C15.7196 1.11822 15.7196 10.9631 15.7196 10.9631"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect x="4" y="19" width="5" height="2" fill="currentColor" />
    </svg>
  );
}
