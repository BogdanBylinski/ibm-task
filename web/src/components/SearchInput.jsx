import React from 'react'

function SearchInput({search, searchInput}) {
  return (
    <div className="col-12 mb-4 mt-4 col-md-6">
    <input
      className="search"
      value={search}
      onChange={(e) => searchInput(e)}
      type="text"
      name=""
      id=""
      style={{minWidth:`80%`}}
      placeholder="Search company by code"
    />
  </div>
  )
}

export default SearchInput