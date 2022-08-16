import React from 'react'

function ResultLine({arr, search, wasDateRangePicked}) {
  return (
    <div className="company_container">
    <div className="company_container-top">
      <div className="profile-category ">Name</div>
      <div className="profile-category">Country</div>
      <div className="profile-category">Currency</div>
      <div className="profile-category">WebSite</div>
    </div>
      {arr && search.length>=1 && "ticker" in arr ? 
      <>
      
      <div className="company_container-bottom">
          <div className="profile-category name" onClick={() => wasDateRangePicked()}>{arr.name}</div>
          <div className="profile-category">{arr.country}</div>
          <div className="profile-category">{arr.currency}</div>
          <a className="profile-web" href={arr.weburl} rel="noreferrer noopener" target="_blank">{arr.weburl? arr.weburl.split("//")[1].split("/")[0]: ""} </a>
    </div>
      </>
       : (
        ""
      )}
  </div>
  )
}

export default ResultLine