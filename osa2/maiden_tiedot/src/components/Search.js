const Search = ({ handleSearch, filter }) => {
  return (
    <div>
      Find countries: <input onChange={handleSearch} value={filter} />
    </div>
  );
};

export default Search;
