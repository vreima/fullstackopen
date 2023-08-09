const TooManyCountries = () => <div>Too many countries</div>;

const Weather = ({ weather }) => {
  if (!weather) return null;
  return (
    <>
      <p>
        temperature {weather.current.temp_c} C, feels like{" "}
        {weather.current.feelslike_c} C
      </p>
      <p>
        <img
          src={weather.current.condition.icon}
          alt={weather.current.condition.text}
        />
      </p>
      <p>wind {weather.current.wind_kph} km/h</p>
    </>
  );
};

const Country = ({ country, weather }) => {
  return (
    <div>
      <h3>{country.name.common}</h3>
      <p>
        capital {country.capital[0]}
        <br />
        area {country.area}
      </p>
      <h4>languages</h4>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flag.alt} />
      <h4>Weather in {country.capital}</h4>
      <Weather weather={weather} />
    </div>
  );
};

const Countries = ({ countries, handleSelection, weather }) => {
  if (!countries) return null;

  if (countries.length >= 10) return <TooManyCountries />;
  if (countries.length === 1)
    return <Country country={countries[0]} weather={weather} />;

  return (
    <div>
      <ul>
        {countries.map((country) => (
          <li key={country.name.official}>
            {country.name.common}{" "}
            <button onClick={() => handleSelection(country.name.common)}>
              show
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Countries;
