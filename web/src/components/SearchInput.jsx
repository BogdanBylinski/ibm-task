import React from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
function SearchInput({search, searchInput}) {
  return (
    <div className="col-12 mb-4 mt-4 col-md-6">

  <input type="search" id="form1" className="form-control" placeholder="Search company by code" aria-label="Search"  value={search}
      onChange={(e) => searchInput(e)}
      style={{minWidth:`80%`}} />
</div>
  
  )
}

export default SearchInput