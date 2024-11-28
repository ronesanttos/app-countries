import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cards from "../components/Cards";
import "./home.css";

const Home = () => {

  function scrollToTop() { //Voltar ao topo
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    });
  }
  window.onscroll = function () {
    var button = document.getElementById("backToTop");
    if (
      document.body.scrollTop > 200 ||
      document.documentElement.scrollTop > 200
    ) {
      button.classList.add("show");
    } else {
      button.classList.remove("show");
    }
  };

  const [region, setRegion] = useState([
    "Africa",
    "America",
    "Asia",
    "Europe",
    "Oceania",
  ]);
  const navigate = useNavigate();

  const [regionSelected, setRegionSelected] = useState("");
  const [input, setInput] = useState("");
  const [countries, setCountries] = useState([]);
  const [countrieName, setCountrieName] = useState([]);
  const [erro, setError] = useState("");
  const handleSelectedRegion = async (e) => {
    const region = e.target.value;
    await fetch(`https://restcountries.com/v3.1/region/${region}`)
      .then((resp) => resp.json())
      .then((data) => {
        const sortedCountries = data.sort((a, b) => {
          if (a.population < b.population) return 1;
          if (a.population > b.population) return -1;
          return 0;
        });
        setCountries(sortedCountries);
      })
      .catch((error) => console.error(error));
  };

  const handleClick = (value) => {
    setCountrieName(value);
    navigate(`countrie/${value}`);
  };

  const getAllCountries = async () => {
    await fetch(" https://restcountries.com/v3.1/all")
      .then((resp) => resp.json())
      .then((data) => {
        const sortedCountries = data.sort((a, b) => {
          if (a.population < b.population) return 1;
          if (a.population > b.population) return -1;
          return 0;
        });
        setCountries(sortedCountries);
      })
      .catch((error) => console.error(error));
  };

  const searchInput = (value) => {
    if (!value) {
      setError("Digite um pais");
    } else {
      navigate(`countrie/search/${value}`);
    }
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  return (
    <main>
      <button
        id="backToTop"
        className="back-to-top"
        onClick={() => scrollToTop()}
      >
        <img src="/images/seta.png" alt="seta" />
      </button>
      <div className="search">
        {erro}
        <div className="input">
          <div className="busca">
            <img
              onClick={() => searchInput(input)}
              src="/images/lupa.png"
              alt="lupa"
            />
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search for a country..."
          />
        </div>
        <div className="select">
          <select
            defaultValue={regionSelected}
            onChange={(e) => handleSelectedRegion(e)}
          >
            <option value={""} disabled>
              Filter by Region
            </option>
            <option value={region[0]}>{region[0]}</option>
            <option value={region[1]}>{region[1]}</option>
            <option value={region[2]}>{region[2]}</option>
            <option value={region[3]}>{region[3]}</option>
            <option value={region[4]}>{region[4]}</option>
          </select>
        </div>
      </div>
      <div className="countries">
        {countries.map((countrie, index) => (
          <Cards key={index} countries={countrie} handleClick={handleClick} />
        ))}
      </div>
    </main>
  );
};

export default Home;
