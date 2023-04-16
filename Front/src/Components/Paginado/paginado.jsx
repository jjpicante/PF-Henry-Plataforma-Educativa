import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import Items from "./items";
import { useDispatch } from "react-redux";
import { getMaterias } from "../../Redux/actions";

//habria que borrar esta?

const Paginate = ({ asignatures, pageCount1 }) => {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(0);

  const handleChange = (selectedPage) => {
    setPageNumber(selectedPage);
    dispatch(getMaterias(selectedPage));
  };

  return (
    <>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={pageCount1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={(selectedPage) => handleChange(selectedPage.selected)}
        containerClassName={"pagination"}
        activeClassName={"active"}
      ></ReactPaginate>
      <Items currentItems={asignatures} />
    </>
  );
};

export default Paginate;
