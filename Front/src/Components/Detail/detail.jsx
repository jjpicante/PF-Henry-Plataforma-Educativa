import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMateriasById, cleanDetail } from "../../Redux/actions";

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const materiaById = useSelector((state) => state.materiaById);

  useEffect(() => {
    dispatch(getMateriasById(id));
    return () => {
    dispatch(cleanDetail());
        }; 
  }, [dispatch, id]);

console.log(materiaById)

}
