import styles from "./SearchBar.module.css";

function SearchBar(props) {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className={styles.container} style={{ gridArea: props.area }}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter IP or URL to find it's location..."
        />
        <button>search</button>
      </form>
    </div>
  );
}

export default SearchBar;
