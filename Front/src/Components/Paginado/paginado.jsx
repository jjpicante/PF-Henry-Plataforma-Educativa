import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import Items from "./items";

//habria que borrar esta?

const Paginate = ({ asignatures, pageCount1 }) => {
  //States
  const [pageNumber, setPageNumber] = useState(0);

  // const handlePageClick = (ev) => {
  //   const newOffset = (ev.selected * itemsPerPage) % data.length;
  //   console.log(
  //     `El usuario pidio el numero de pagina ${ev.selected}, que tiene un offset de ${newOffset}`
  //   );
  //   setPageNumber(ev.selected);
  //   setItemOffset(newOffset);
  // };

  return (
    <>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={pageCount1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={(selectedPage) => setPageNumber(selectedPage.selected)}
        containerClassName={"pagination"}
        activeClassName={"active"}
      ></ReactPaginate>
      <Items currentItems={asignatures} />
    </>
  );
};

export default Paginate;
