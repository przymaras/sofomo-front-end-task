import { useState } from "react/cjs/react.development";
import styles from "./SearchBar.module.css";

function SearchBar(props) {
  const [searchValue, setSearchValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const urlExpression =
      /(http(s)?:\/\/.)?(www\.)?(?:[-a-zA-Z0-9@:%_\+~#=]{1,63}\.)+[a-z]{2,6}\b((?:[-a-zA-Z0-9@:%_\+~#?&//="]+\.)*[-a-zA-Z0-9@:%_\+~#?&//="]+)?/g;
    const urlRegex = new RegExp(urlExpression);

    const ipExpression =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipRegex = new RegExp(ipExpression);

    if (searchValue.match(urlRegex) || searchValue.match(ipRegex)) {
      props.handleSearch(searchValue);
      setSearchValue("");
    } else {
      alert("You entered invalid IP or invalid URL - please check ...");
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
        />
        <button>search</button>
      </form>
    </div>
  );
}

export default SearchBar;
