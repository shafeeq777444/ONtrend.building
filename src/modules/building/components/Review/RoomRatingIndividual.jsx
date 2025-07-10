function RoomRatingIndividual({ label, value, icon }) {
    return (
        <div className="flex flex-col gap-1">
            {/* Top row: Icon, Label, Value */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img className="w-6" src={icon} alt={label} />
                    <span className="text-md font-medium text-gray-800">{label}</span>
                </div>
                <span className="font-semibold text-gray-800">{value.toFixed(1)}</span>
            </div>

            {/* Rating bar */}
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                <div
                    className="h-full bg-yellow-400 rounded-full transition-all duration-300 "
                    style={{ width: `${(value / 5) * 100}%` }}
                ></div>
            </div>
        </div>
    );
}
export default RoomRatingIndividual