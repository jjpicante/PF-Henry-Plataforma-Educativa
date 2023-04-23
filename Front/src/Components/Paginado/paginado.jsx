import ReactPaginate from "react-paginate";
import { useState } from "react";
import Items from "./items";
import { useDispatch } from "react-redux";
import { getMaterias } from "../../Redux/actions";
import style from "./Paginate.module.css";

const Paginate = ({ asignatures, pageCount1 }) => {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(0);

  const handleChange = (selectedPage) => {
    setPageNumber(selectedPage);
    dispatch(getMaterias(selectedPage));
  };

  return (
    <>
      {/* {console.log("-------->", asignatures)} */}
      <ReactPaginate
        className={`${style.pagination} pagination`}
        activeClassName={style.active}
        previousLabel={"🢀"}
        nextLabel={"🢂"}
        breakLabel={"..."}
        pageCount={pageCount1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={(selectedPage) => handleChange(selectedPage.selected)}
      />
      <Items currentItems={asignatures} />
    </>
  );
};

export default Paginate;
