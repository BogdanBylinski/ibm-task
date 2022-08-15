import React from 'react'
import { addDays } from "date-fns";
import { subDays } from "date-fns";
import DatePicker from "react-datepicker";
function DatePickerInput({startDate, endDate, setDateRange}) {
    
  return (
    <div className="col-12  mt-md-4 col-md-6">
            <DatePicker
            className="datePicker"
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              calendarStartDay={1}  
              placeholderText="Choose date range"
              includeDateIntervals={[
                {
                  start: subDays(new Date(), 365),
                  end: addDays(new Date(), 0),
                },
              ]}
              onChange={(update) => {
                setDateRange(update);
              }}
              withPortal
            />
          </div>
  )
}

export default DatePickerInput