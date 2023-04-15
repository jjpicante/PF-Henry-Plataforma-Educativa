import style from "../Classroom/Classroom.module.css";
import CardAsignature from "../Cards/cards";

const Items = ({ currentItems }) => {
  return (
    <>
      <div className={style.cardsContent}>
        {currentItems &&
          currentItems.map((elem) => {
            return (
              <CardAsignature
                key={elem.id}
                id={elem.id}
                name={elem.nombre}
                year={elem.año}
              />
            );
          })}
      </div>
    </>
  );
};

export default Items;
