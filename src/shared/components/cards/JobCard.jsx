import { FaDatabase } from 'react-icons/fa';
import Card from "./Card"

const JobCard = ({ title, availableSpots, description, onViewDetails }) => {
    return (
        <Card className="h-full">
            <div className="flex flex-col h-full">
                {/* Icon and title */}
                <div className="flex items-center mb-3">
                    <div className="bg-purple-100 p-2 rounded-lg mr-3">
                        <FaDatabase className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 leading-tight">{title}</h3>
                </div>

                {/* Available spots */}
                <p className="text-gray-500 text-sm mb-3">{availableSpots} Cupos disponibles</p>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">{description}</p>

                <div className="my-4">
                </div>

                {/* Action button */}
                <button
                    onClick={onViewDetails}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                    <span className="mr-2">📋</span>
                    Ver detalles
                </button>
            </div>
        </Card>
    )
}

export default JobCard
