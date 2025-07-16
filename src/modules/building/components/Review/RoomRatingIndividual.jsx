function RoomRatingIndividual({ label, value, icon }) {
    return (
        <div className="flex flex-col gap-2 p-4 bg-white rounded-xl  hover:shadow-lg transition-shadow duration-200 w-full ">
            {/* Top row: Icon, Label, Value */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img className="w-8 h-8 rounded-full bg-gray-100 p-1" src={icon} alt={label} />
                    <span className="text-lg font-semibold text-gray-900 tracking-wide">{label}</span>
                </div>
                <span className="font-bold text-gray-900 text-lg">{value.toFixed(1)}</span>
            </div>

            {/* Rating bar */}
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-1 mt-1">
                <div
                    className="h-full rounded-full transition-all duration-300 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500"
                    style={{ width: `${(value / 5) * 100}%` }}
                ></div>
            </div>
        </div>
    );
}
export default RoomRatingIndividual;