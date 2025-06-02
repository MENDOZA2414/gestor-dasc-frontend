import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({ percentage, height }) => {
  const clampedPercentage = Math.max(0, Math.min(percentage, 100));

  return (
    <div
      className="w-full bg-gray-200 rounded-full overflow-hidden"
      style={{ height }}
    >
      <div
        className="bg-green-400 rounded-full transition-all duration-300"
        style={{ width: `${clampedPercentage}%`, height: '100%' }}
      ></div>
    </div>
  );
};

ProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired,
};

export default ProgressBar;