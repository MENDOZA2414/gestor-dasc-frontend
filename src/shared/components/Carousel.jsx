import { useState, useEffect } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

const Carousel = ({ children, itemsPerView = { mobile: 1, tablet: 2, desktop: 3 }, gap = "gap-4", className = "" }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [itemsToShow, setItemsToShow] = useState(itemsPerView.desktop)

    // Responsive logic
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setItemsToShow(itemsPerView.mobile)
            } else if (window.innerWidth < 1024) {
                setItemsToShow(itemsPerView.tablet)
            } else {
                setItemsToShow(itemsPerView.desktop)
            }
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [itemsPerView])

    // Reset index if it's out of bounds after resize
    useEffect(() => {
        const maxIndex = Math.max(0, children.length - itemsToShow)
        if (currentIndex > maxIndex) {
            setCurrentIndex(maxIndex)
        }
    }, [itemsToShow, children.length, currentIndex])

    const totalItems = children.length
    const maxIndex = Math.max(0, totalItems - itemsToShow)
    const canGoPrev = currentIndex > 0
    const canGoNext = currentIndex < maxIndex

    const goToPrev = () => {
        if (canGoPrev) {
            setCurrentIndex(currentIndex - 1)
        }
    }

    const goToNext = () => {
        if (canGoNext) {
            setCurrentIndex(currentIndex + 1)
        }
    }

    const goToSlide = (index) => {
        const clampedIndex = Math.min(Math.max(0, index), maxIndex)
        setCurrentIndex(clampedIndex)
    }

    // Calculate total pages for indicators
    const totalPages = Math.ceil(totalItems / itemsToShow)
    const currentPage = Math.floor(currentIndex / itemsToShow)

    return (
        <div className={`relative w-full ${className}`}>
            {/* Main carousel container */}
            <div className="relative">
                <div className="flex items-center">
                    {/* Previous button */}
                    <button
                        onClick={goToPrev}
                        disabled={!canGoPrev}
                        className={`absolute left-1 z-10 p-2 rounded-full shadow-lg transition-all duration-200 ${canGoPrev
                                ? "bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 cursor-pointer"
                                : "bg-gray-100 text-gray-300 cursor-not-allowed"
                            }`}
                        style={{ transform: "translateX(-50%)" }}
                    >
                        <FaChevronLeft size={24} />
                    </button>

                    {/* Carousel content */}
                    <div className="w-full px-8">
                        <div
                            className={`flex transition-transform duration-300 ease-in-out ${gap}`}
                            style={{
                                transform: `translateX(-${(currentIndex * 105) / itemsToShow}%)`,
                            }}
                        >
                            {children.map((child, index) => (
                                <div key={index} className="flex-shrink-0" style={{ width: `${100 / itemsToShow}%` }}>
                                    <div className={gap === "gap-4" ? "px-2" : gap === "gap-6" ? "px-3" : "px-1"}>{child}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Next button */}
                    <button
                        onClick={goToNext}
                        disabled={!canGoNext}
                        className={`absolute right-1 z-10 p-2 rounded-full shadow-lg transition-all duration-200 ${canGoNext
                                ? "bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 cursor-pointer"
                                : "bg-gray-100 text-gray-300 cursor-not-allowed"
                            }`}
                        style={{ transform: "translateX(50%)" }}
                    >
                        <FaChevronRight size={24} />
                    </button>
                </div>
            </div>

            {/* Indicators */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-6 space-x-2">
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index * itemsToShow)}
                            className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentPage ? "bg-blue-500" : "bg-gray-300 hover:bg-gray-400"
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Carousel