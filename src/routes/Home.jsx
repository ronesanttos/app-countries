import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cards from "../components/Cards";
import "./home.css";
import { useTheme } from "../context/ThemeContext";
import Message from "../components/Message";
import Search from "../components/Search";

const Home = () => {

  //Voltar ao topo
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const [region, setRegion] = useState([
    "Africa",
    "America",
    "Asia",
    "Europe",
    "Oceania",
  ]);
  const [regionSelected, setRegionSelected] = useState("");
  const navigate = useNavigate();
  const { countries, setCountries, error, setError, isLoading, setIsLoading } = useTheme();

  // Detecta quando o usuário rola e exibe o botão de voltar ao topo
  useEffect(() => {
    const handleScroll = () => {
      const button = document.getElementById("backToTop");
      if (
        document.body.scrollTop > 200 ||
        document.documentElement.scrollTop > 200
      ) {
        button.classList.add("show");
      } else {
        button.classList.remove("show");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // Limpar o evento ao desmontar o componente
    };
  }, []);

  const handleSelectedRegion = async (e) => {
    const region = e.target.value;
    setRegionSelected(region);

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

  const search = (name) => {
    if (!name) {
      setError(true);
    } else {
      setIsLoading(false)
      navigate(`/${name}`);
    }
  };

  const handleClick = (name) => {
    if (!name) {
      setError(true);
    } else {
      setIsLoading(false)
      navigate(`/${name}`);
    }
  };

  return (
    <main>
      <button
        id="backToTop"
        className="back-to-top"
        onClick={scrollToTop}
      >
        <img src="/images/seta.png" alt="seta" />
      </button>
      <div className="search">
        <div className="input">
          <Search loadCountrie={search} />
        </div>
        <div className="select">
          <select
            value={regionSelected}
            onChange={handleSelectedRegion}
          >
            <option value={""} disabled>
              Filter by Region
            </option>
            {region.map((regionOption, index) => (
              <option key={index} value={regionOption}>
                {regionOption}
              </option>
            ))}
          </select>
        </div>
      </div>
      {error && <Message msg={"Error."} />}
      {countries && (
        <div className="countries">
          {countries.map((countrie, index) => (
            <Cards key={index} {...countrie} handleClick={handleClick} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Home;
