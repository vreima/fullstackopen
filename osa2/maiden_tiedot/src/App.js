import { useState, useEffect } from "react";
import Search from "./components/Search";
import Countries from "./components/Countries";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [weather, setWeather] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const getWeather = (country) => {
    const baseUrl = "http://api.weatherapi.com/v1";
    const currentWeather = "current.json";
    const q = `q=${country.capital}`;
    const key = `key=${process.env.REACT_APP_WEATHER_API_KEY}`;

    axios
      .get(`${baseUrl}/${currentWeather}?${key}&${q}`)
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        console.log(error);
        setWeather(null);
      });
  };

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setCountries(response.data));
  }, []);

  const handleSearch = (event) => handleSelection(event.target.value);

  const handleSelection = (name) => {
    setFilter(name);
    setFilteredCountries(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(name.toLowerCase())
      )
    );
  };

  useEffect(() => {
    if (filteredCountries.length === 1) {
      const country = filteredCountries[0];
      getWeather(country);
    }
  }, [filteredCountries]);

  return (
    <div>
      <Search handleSearch={handleSearch} filter={filter} />
      <Countries
        countries={filteredCountries}
        handleSelection={handleSelection}
        weather={weather}
      />
    </div>
  );
}

export default App;
