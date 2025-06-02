import React from 'react';
import { FaRunning, FaFlagCheckered } from 'react-icons/fa';
import PropTypes from 'prop-types';

const stages = [
    { label: 'Inicio', threshold: 10 },
    { label: 'Reporte I', threshold: 25 },
    { label: 'Reporte II', threshold: 50 },
    { label: 'Reporte Conclusivo', threshold: 100 },
];

const GoalProgressBar = ({ percentage }) => {
    const clampedPercentage = Math.max(0, Math.min(percentage, 100));

    return (
        <div className="w-full relative">
            {/* Colored progress bar */}
            <div className="w-full bg-gray-000 h-1 rounded-full overflow-hidden" >
                <div
                    className="bg-green-400 h-1 rounded-full transition-all duration-300"
                    style={{ width: `${clampedPercentage - 2.5}%` }}
                ></div>
                <div
                    className="bg-gray-300 h-1 rounded-full absolute top-0"
                    style={{
                        left: `calc(${clampedPercentage}% + 0.75rem)`,
                        right: 25
                    }}
                ></div>
            </div>

            {/* Flag Icon */}
            <div className="absolute -top-2 right-0">
                <FaFlagCheckered
                    className={clampedPercentage >= 100 ? 'text-green-400' : 'text-gray-400'}
                />
            </div>

            {/* Runner Icon */}
            <div
                className="absolute -top-2 transition-all duration-300"
                style={{
                    left:
                        clampedPercentage >= 100
                            ? `calc(${clampedPercentage}% - 0.75rem + 15px)`
                            : `calc(${clampedPercentage}% - 0.75rem)`
                }}
            >
                <FaRunning className="text-green-400" />
            </div>

            {/* Labels */}
            <div className="flex justify-between text-xs mt-2 text-gray-600">
                {stages.map((stage, idx) => (
                    <span key={idx} className="text-center w-1/4">
                        {stage.label}
                    </span>
                ))}
            </div>
        </div>
    );
};

GoalProgressBar.propTypes = {
    percentage: PropTypes.number.isRequired,
};

export default GoalProgressBar;