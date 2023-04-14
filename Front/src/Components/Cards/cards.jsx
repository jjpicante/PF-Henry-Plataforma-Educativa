import style from "./CardAsignature.module.css"

export default function CardAsignature({ name, year , id }) {
  return (
    <div className={style.cards}>
      <h1>{name}</h1>
      <h2>{year}</h2>
    </div>
  );
}
