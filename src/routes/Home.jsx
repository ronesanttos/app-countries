import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cards from "../components/Cards";
import "./home.css";
import { useTheme } from "../context/ThemeContext";
import Message from "../components/Message";
import Search from "../components/Search";

const Home = () => {
  function scrollToTop() {
    //Voltar ao topo
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
  const { countries, setCountries, error, setError, isLoading, setIsLoading } = useTheme();

  const handleSelectedRegion = async (e) => {
    const region = e.target.value;
    const res = await fetch(`https://restcountries.com/v3.1/region/${region}`);
    const data = await res.json();

    if (res.status === 404) {
      setError(true);
      return;
    }
    const sortedCountries = data.sort((a, b) => {
      if (a.population < b.population) return 1;
      if (a.population > b.population) return -1;
      return 0;
    });
    setCountries(sortedCountries);
  };

  const search = (countrie) => {
    if (!countrie) {
      setError(true);
    } else {
      setIsLoading(false)
      navigate(`/${countrie}`);
    }
  };

  const handleClick = (countrie) => {
    if (!countrie) {
      setError(true);
    } else {
      setIsLoading(false)
      navigate(`/${countrie}`);
    }
  };

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
        <div className="input">
          <Search loadCountrie={search} />
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
      {error && <Message msg={"Error."} />}
      {countries && (
        <div className="countries">
          {countries.map((countrie, index) => (
            <Cards key={index} {...countrie} handleClick={handleClick}/>
          ))}
        </div>
      )}
    </main>
  );
};

export default Home;
