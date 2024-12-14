import { Link } from "react-router-dom";
import "./card.css";

const Cards = ({ flags, name, population, region, capital, handleClick }) => {
  return (
    <div className="container-cards">
      <div className="imgs">
        <img src={flags?.png} alt={name?.common} />
      </div>
      <div className="info">
        <a href={`/${name?.common}`} >{name?.common}</a>
        <p>
          Population:{" "}
          <span>{Intl.NumberFormat("pt-BR").format(population)}</span>
        </p>
        <p>
          Region: <span>{region}</span>
        </p>
        <p>
          Capital: <span>{capital}</span>
        </p>
      </div>
    </div>
  );
};

export default Cards;
