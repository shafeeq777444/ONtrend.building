// DateRangePicker.jsx
'use client';

import { DateRange } from 'react-date-range';
import { useState } from 'react';
import 'react-date-range/dist/styles.css'; // Main CSS
import 'react-date-range/dist/theme/default.css'; // Theme CSS
import '@/utils/styles/custom-calender.css';

import DateRangeSelectorDisplay from './DateRangeSelectorDisplay';

export default function DateRangeSelector() {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

    const { startDate, endDate } = range[0];

  return (
    <div className="max-w-xl mx-auto mt-8 fixed inset-0">
      {/* Custom Display */}
      <DateRangeSelectorDisplay startDate={startDate} endDate={endDate}/>

      {/* Date Range Picker */}
      <DateRange
        editableDateInputs={true}
        onChange={(item) => setRange([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={range}
        months={2}
        direction="horizontal"
        className="rounded-xl shadow-lg"
      />
    </div>
  );
}
