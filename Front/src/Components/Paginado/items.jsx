import style from "../Classroom/Classroom.module.css";
import CardAsignature from "../Cards/cards";

const Items = ({ currentItems }) => {
  return (
    <>
      <div className={style.cardsContent}>
        {currentItems &&
          currentItems.map((elem) => {
            return <CardAsignature key={elem.id} name={elem.nombre} />;
          })}
      </div>
    </>
  );
};

export default Items;
