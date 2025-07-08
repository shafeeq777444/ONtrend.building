// BookingSidebar.jsx
import { Calendar, Users, Tag } from 'lucide-react';
import DateRangeSelector from '../Common/DateRangeSelector';

const BuildingBookingSideBar = () => {
  return (
    <div className="w-full max-w-sm p-4 rounded-xl border shadow-sm bg-white space-y-4 sticky h-100 top-30">
      {/* Date Section */}
      <div className="border rounded-lg p-3 space-y-1">
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="w-4 h-4 mr-2" />
          Dates
        </div>
        <div className="text-sm font-medium">Mon, 01 Mar 2025 → Tue, 02 Mar 2025</div>
        {/* <DateRangeSelector/> */}
      </div>

      {/* Guests */}
      <div className="border rounded-lg p-3 space-y-1">
        <div className="flex items-center text-sm text-gray-500">
          <Users className="w-4 h-4 mr-2" />
          Dates
        </div>
        <div className="text-sm font-medium">1 Room, 2 Adults</div>
      </div>

      {/* Special Rates */}
      <div className="border rounded-lg p-3 space-y-1">
        <div className="flex items-center text-sm text-gray-500">
          <Tag className="w-4 h-4 mr-2" />
          Special Rates
        </div>
        <div className="text-sm font-medium">Lowest Regular Rate</div>
      </div>

      {/* Pricing */}
      <div className="flex justify-between items-center text-sm font-semibold text-gray-700">
        <span>Pricing</span>
        <span>$600 <span className="text-sm font-normal text-gray-500">/night</span></span>
      </div>

      {/* Reserve Button */}
      <button className="w-full py-2 bg-black text-white rounded-md text-sm font-medium hover:opacity-90 transition">
        Reserve
      </button>
    </div>
  );
};

export default BuildingBookingSideBar;
