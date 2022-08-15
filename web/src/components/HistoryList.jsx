// import React, { useState } from 'react'
// import ReactPaginate from 'react-paginate'
// import Table from 'react-bootstrap/Table';
// import { useEffect } from 'react';
// function HistoryList({dataApi}) {
    

// console.log(dataApi);

//     const data = dataApi;
//     const [currentItems, setCurrentItems] = useState([]);
//     const [pageCount, setPageCount] = useState(0);
//     const [itemOffSet, setItemOffSet] = useState(0);
//     const itemsPerPage = 5;

// useEffect(()=>{
//     const endOffSet = itemOffSet + itemsPerPage;
//     setCurrentItems(data.slice(itemOffSet, endOffSet));
//     setPageCount(Math.ceil(data.length / itemsPerPage));

// },[itemOffSet, itemsPerPage, data]);
//     const handlePageClick = (event) =>{

//         const newOffSet = (event.selected * itemsPerPage) % data.length;
//         setItemOffSet(newOffSet)
//     }
//     if (dataApi){

//   return (
//     <>
 
//         <Table striped bordered hover>

//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Close </th>
//               <th>High </th>
//               <th>Low</th>
//               <th>Open</th>
//               <th>Value</th>
//             </tr>
//           </thead>

//           <tbody>
//               {
//                   data !== "no_data"? currentItems.map((element, index)=>

//             <tr key={index}>
//               <td>{element[4]}</td>
//               <td>Mark</td>
//               <td>Otto</td>
//               <td>@mdo</td>
//             </tr>
//                   ):''
//               }
//         </tbody>
//         </Table>

//         {
//             data.length >5?

//             <ReactPaginate
//             breakLabel="..."
//             nextLabel="next >"
//             onPageChange={handlePageClick}
//             pageRangeDisplayed={2}
//             pageCount={pageCount}
//             previousLabel="< previous"
//             renderOnZeroPageCount={null}
//             containerClassName='pagination'
//             previousLinkClassName='page-num'
//             pageLinkClassName='page-num'
//             nextLinkClassName='page-num'
//             activeClassName='active'
            
//             />:''

//         }
//            </>
            
//       );
//     }
// }
    

// export default HistoryList