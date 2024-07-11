'use client'
import React, { FC, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateInput: FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={(date: Date | null) => setStartDate(date)}
        inline
        // showMonthYearPicker
      />
      <p>{startDate?.toLocaleDateString()}</p>
    </div>
  );
};

export default DateInput;