import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./PaginateAdmin.module.css";
import ItemsAdmin from "./items/items";
import { getMateriasAdmin } from "../../../../Redux/actions";

const PaginateAdmin = ({ data, pageCount1, itemsPerPage }) => {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(0);
  const materias = useSelector((state) => state.materiasAdmin);
  console.log(pageCount1);
  useEffect(() => {
    async function listamaterias() {
      await dispatch(await getMateriasAdmin());
    }
    listamaterias();
  }, []);
  const handleChange = (selectedPage) => {
    setPageNumber(selectedPage);
    dispatch(getMateriasAdmin(selectedPage));
  };

  return (
    <>
      <ReactPaginate
        className={style.pagination}
        activeClassName={style.active}
        previousLabel={"🢀"}
        nextLabel={"🢂"}
        breakLabel={"..."}
        pageCount={pageCount1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={(selectedPage) => handleChange(selectedPage.selected)}
      />
      <ItemsAdmin currentItems={materias} />
    </>
  );
};

export default PaginateAdmin;
