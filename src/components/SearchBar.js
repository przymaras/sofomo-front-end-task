import { useState } from "react";
import styles from "./SearchBar.module.css";

function testQuery(query) {
  const urlExpression =
    /(http(s)?:\/\/.)?(www\.)?(?:[-a-zA-Z0-9@:%_+~#=]{1,63}\.)+[a-z]{2,6}\b((?:[-a-zA-Z0-9@:%_+~#?&//="]+\.)*[-a-zA-Z0-9@:%_+~#?&//="]+)?/g;
  const urlRegex = new RegExp(urlExpression);

  const ipExpression =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const ipRegex = new RegExp(ipExpression);

  // return true;
  return query.match(urlRegex) || query.match(ipRegex);
}

function SearchBar(props) {
  const [searchValue, setSearchValue] = useState("");
  const [isSearchInputTouched, setIsSearchInputTouched] = useState(false);

  const searchValueIsInvalid = !testQuery(searchValue) && isSearchInputTouched;

  function handleSubmit(e) {
    e.preventDefault();
    setIsSearchInputTouched(true);
    if (testQuery(searchValue)) {
      props.handleSearch(searchValue);
      setSearchValue("");
      setIsSearchInputTouched(false);
    }
  }

  function handleChange(e) {
    setSearchValue(e.target.value);
  }

  return (
    <div className={styles.container} style={{ gridArea: props.area }}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          name="search"
          type="search"
          placeholder="Enter valid IP or URL to find it's location..."
          value={searchValue}
          onBlur={() => setIsSearchInputTouched(true)}
        />
        <button>search</button>
      </form>
      {searchValueIsInvalid && (
        <p className={styles.invalid}>
          Invalid IP or invalid URL - please check ...
        </p>
      )}
    </div>
  );
}

export default SearchBar;
