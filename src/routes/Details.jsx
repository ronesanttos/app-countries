import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./details.css";

const Details = () => {
  const { name } = useParams();
  const [countrie, setCountrie] = useState([]);
  const [value, setValue] = useState("")
  console.log(countrie[0])
  useEffect(() => {

    const getCountriesName = async (name) => {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${name}`
      );
      const data = await response.json();
      setCountrie(data);

    };
    getCountriesName(name)
  }, [])

  const handleCountrieClick = async (value) => {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/alpha/${value}`
      );
      const data = await response.json();
      setCountrie(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setValue(name)
  },[name])

  if (!countrie[0]) {
    return <p>Carregando...</p>; // Show a loading message while data is being fetched
  }

  const country = countrie[0];


  const currencies = country.currencies
    ? Object.values(country.currencies)
      .map((currency) => currency.name)
      .join(", ")
    : "N/A";
  const borders = country.borders || [];
  const firstName = country.name?.nativeName
    ? Object.values(country.name.nativeName)[0] // Pega o primeiro nome
    : "N/A";

  return (
    <div className="container-details">
      <div className="box-exit">
        <Link to="/">Back</Link>
      </div>
      <div className="box-info">
        <div className="details-img">
          <img src={country.flags?.png} alt={country.name?.common} />
        </div>
        <div className="details-info">
          <h2>{country.name?.common}</h2>
          <p>
            Native Name:{" "}
            <span>
              {firstName ? firstName.common : "N/A"}
            </span>
          </p>
          <p>
            Population: <span>{Intl.NumberFormat('pt-BR').format(country.population)}</span>
          </p>
          <p>
            Region: <span>{country.region}</span>
          </p>
          <p>
            Sub Region: <span>{country.subregion}</span>
          </p>
          <p>
            Capital: <span>{country.capital}</span>
          </p>
          <div className="fronteiras">
            <h3>Border Countries:</h3>
            {borders.length > 0 ? (
              borders.map((border, index) => (
                <button value={value} onClick={() => handleCountrieClick(border)} key={index}>{border}</button> 
              ))
            ) : (
              <p>No border countries</p>
            )}
          </div>
          <div className="division">
            <p>
              Top Level Domain: <span>{country.tld?.[0]}</span>
            </p>
            <p>
              Currencies: <span>{currencies}</span>
            </p>
            <p>
              Languages:
              {country.languages
                ? Object.values(country.languages).map((lang, index) => (
                  <span key={index}>
                    {lang}
                    {index < Object.values(country.languages).length - 1
                      ? ", "
                      : ""}
                  </span>
                ))
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
