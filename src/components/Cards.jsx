import "./card.css";

const Cards = ({ countries, handleClick }) => {
  return (
    <div className="container-cards">
      <div className="imgs">
        <img src={countries.flags.png} alt={countries.name?.common} />
      </div>
      <div className="info">
        <button onClick={(e) => handleClick(e.target.value,)}  value={countries.name.common}>{countries.name.common}</button>
        <p>
          Population: <span>{Intl.NumberFormat('pt-BR').format(countries.population)}</span>
        </p>
        <p>
          Region: <span>{countries.region}</span>
        </p>
        <p>
          Capital: <span>{countries.capital}</span>
        </p>
      </div>
    </div>
  );
};

export default Cards;
