import React from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const BiToggleButton = ({ toggleValue, setToggleValue }) => {
  const isToggled = toggleValue === 1;

  const handleToggle = () => {
    setToggleValue(isToggled ? 0 : 1);
  };

  return (
    <button
      onClick={handleToggle}
      className="flex items-center justify-center p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
    >
      {isToggled ? <FaChevronUp /> : <FaChevronDown />}
    </button>
  );
};

export default BiToggleButton;
