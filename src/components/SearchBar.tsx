import React from 'react'

interface SearchBarProps {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ placeholder, onChange }: SearchBarProps) {
    return (
        <div className="container flex justify-center items-center ">
            
            <div className="relative">

                {/* SVG search icon */}
                <div className="absolute top-1/2 left-3 -translate-y-1/2"> 
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
                    />
                  </svg>
                </div>

                <input
                  type="text"
                  className="h-14 w-96 pl-10 pr-4 rounded-lg z-0 bg-primary-content shadow focus:outline-none" 
                  placeholder={placeholder}
                  onChange={onChange}
                />

            </div>
        </div>
    )
}   