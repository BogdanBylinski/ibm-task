import React from 'react'
import HistoryTab from "./HistoryTab";
function ChartLine({apiData, dateRangeWasNotPicked }) {
  return (

    
        dateRangeWasNotPicked === 1 ? (
          <div className="rangeWasNotPicked">
            You have to choose date range
          </div>
        ) : (
          <HistoryTab dataApi={apiData}></HistoryTab>
        )
        
  )
}

export default ChartLine