import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./details.css";

const Search = () => {
  const { names } = useParams();
  const [countrie, setCountrie] = useState([]);

  const getCountriesName = async () => {
    try {
      const response = await fetch(
      `https://restcountries.com/v3.1/translation/${names}`
      );
      const data = await response.json();
      setCountrie(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCountriesName();
  }, [names]); // Re-fetch data when the 'name' changes

  if (!countrie[0]) {
    return <p>Loading...</p>; // Show a loading message while data is being fetched
  }

  const country = countrie[0];
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(", ")
    : "N/A";
  const borders = country.borders || [];

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
              {country.name?.nativeName
                ? Object.entries(country.name.nativeName).map(
                    ([key, value]) => <span key={key}>{value.common} </span>
                  )
                : "N/A"}
            </span>
          </p>
          <p>
            Population: <span>{country.population}</span>
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
                <button key={index}>{border}</button> // Assuming you want to display the country codes
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

export default Search;
