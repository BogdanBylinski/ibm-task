import React from 'react'
import HistoryTab from "./HistoryTab";
function ChartLine({apiData, dateRangeWasNotPicked ,search}) {
  if(search.length===0){
    return ""
  }
  return (

    
        dateRangeWasNotPicked === 1 ? (
          <div className="rangeWasNotPicked">
            You have to choose date range
          </div>
        ) : (
          <HistoryTab dataApi={apiData} search={search}></HistoryTab>
        )
        
  )
}

export default ChartLine