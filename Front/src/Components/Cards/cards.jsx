import style from "./CardAsignature.module.css"

export default function CardAsignature({ name, id }) {
  return (
    <div className={style.cards}>
      <h1>{name}</h1>
    </div>
  );
}
