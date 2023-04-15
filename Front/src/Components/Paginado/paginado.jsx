import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import Items from "./items";

const Paginate = ({ itemsPerPage, route, data, query }) => {
  //States
  const [currentItems, setCurrentItems] = useState();
  const [pageNumber, setPageNumber] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    //Esto para cuando tengamos bien la base de datos por mientras harcodeado

    // const endOffset = itemOffset + itemsPerPage;
    // console.log(`Cargando items de ${itemOffset} hasta ${endOffset}`);

    // const fetchData = async () => {
    //   try {
    //     let response = await axios.get(
    //       `/${route}?page=${pageNumber}&size=${itemsPerPage}`
    //     );
    //     setCurrentItems(response.data);
    //     setPageCount(response.data.pageCount);
    //   } catch (error) {
    //     alert(error);
    //   }
    // };
    //-----------------------------------------------------------------------

    //El harcodeo en cuestion
    // if (query) setPageNumber(0);
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (ev) => {
    const newOffset = (ev.selected * itemsPerPage) % data.length;
    console.log(
      `El usuario pidio el numero de pagina ${ev.selected}, que tiene un offset de ${newOffset}`
    );
    setPageNumber(ev.selected);
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        // forcePage={pageNumber}
        pageCount={pageCount}
        previousLabel="< previous"
        breakLabel="..."
      />
    </>
  );
};

export default Paginate;
