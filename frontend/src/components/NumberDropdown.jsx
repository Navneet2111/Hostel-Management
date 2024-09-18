import React, { useState, useEffect, useRef } from 'react';

const NumberDropdown = ({ onSelectNumber }) => { 
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleNumberSelect = (number) => {
    setSelectedNumber(number);
    onSelectNumber(number);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center" onClick={toggleDropdown}>
        {selectedNumber ? selectedNumber : "Select a Number"}
        <svg
          className={`fill-current h-4 w-4 ml-2 ${isOpen ? 'transform rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <ul className="absolute mt-2 text-gray-700 pt-1 w-24 bg-white border rounded-lg shadow-lg z-10">
          {numbers.map((number) => (
            <li key={number}>
              <button
                className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-200"
                onClick={() => handleNumberSelect(number)}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NumberDropdown;
