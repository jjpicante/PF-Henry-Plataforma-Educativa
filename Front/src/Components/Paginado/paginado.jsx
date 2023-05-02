import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import Items from "./items";
import style from "./Paginate.module.css";

const Paginate = ({ data, pageCount1, itemsPerPage }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [currentItems, setCurrentItems] = useState();
  const [pageCount, setPageCount] = useState(0);
  const [itemOffSet, setItemOffset] = useState(0);

  useEffect(() => {
    if (data) {
      const endOffset = itemOffSet + itemsPerPage;
      setCurrentItems(data.slice(itemOffSet, endOffset));
      setPageCount(Math.ceil(data.length / itemsPerPage));
    }
  }, [data, itemOffSet, itemsPerPage]);

  const handleChange = (ev) => {
    const newOffset = (ev.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
    setPageNumber(ev.selected);
  };

  return (
    <>
      <ReactPaginate
        className={style.pagination}
        activeClassName={style.active}
        previousLabel={"🢀"}
        nextLabel={"🢂"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handleChange}
        forcePage={pageNumber}
      />
      <Items currentItems={currentItems} />
    </>
  );
};

export default Paginate;
