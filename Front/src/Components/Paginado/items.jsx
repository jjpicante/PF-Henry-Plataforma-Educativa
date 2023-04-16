import style from "../Classroom/Classroom.module.css";
import CardAsignature from "../Cards/cards";

const Items = ({ currentItems }) => {
  console.log(currentItems.length);
  return (
    <>
      <div className={style.cardsContent}>
        {currentItems.length === undefined
          ? console.log("no")
          : currentItems?.map((elem) => {
              return (
                <CardAsignature
                  key={elem.id}
                  id={elem.id}
                  name={elem.namemateria}
                  year={elem.anio}
                />
              );
            })}
      </div>
    </>
  );
};

export default Items;
