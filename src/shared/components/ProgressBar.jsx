import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({ percentage }) => {
  const clampedPercentage = Math.max(0, Math.min(percentage, 100));

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-green-400 h-2.5 rounded-full transition-all duration-300"
        style={{ width: `${clampedPercentage}%` }}
      ></div>
    </div>
  );
};

ProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired,
};

export default ProgressBar;