import { useEffect, useState } from "react";
import styles from "./App.module.css";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import SearchBar from "./components/SearchBar";
import { nanoid } from "nanoid";
import HistoryItem from "./components/HistoryItem";

function App() {
  const [userDataAvailable, setUserDataAvailable] = useState(false);
  const [userData, setUserData] = useState({});
  const [searchDataAvailable, setSearchDataAvailable] = useState(false);
  const [searchData, setSearchData] = useState({});
  const [searchHistory, setSearchHistory] = useState(
    sessionStorage.getItem("searchHistory")
      ? JSON.parse(sessionStorage.getItem("searchHistory"))
      : []
  );

  useEffect(() => {
    async function getUserIpData() {
      try {
        let res = await fetch("https://api.ipify.org/?format=json");
        let data = await res.json();
        res = await fetch(
          `http://api.ipstack.com/${data.ip}?access_key=c5bf1cc2f1b52c6c3c63a427ae3cb063`
        );
        data = await res.json();
        setUserData(data);
        setUserDataAvailable(true);
      } catch (e) {
        console.error("Can't fetch data ...");
      }
    }

    getUserIpData();
  }, []);

  function handleSearch(query) {
    async function getSearchData() {
      try {
        let res = await fetch(
          `http://api.ipstack.com/${query}?access_key=c5bf1cc2f1b52c6c3c63a427ae3cb063`
        );
        let data = await res.json();
        setSearchData(data);
        setSearchDataAvailable(true);
        setSearchHistory((prevState) => [
          ...prevState,
          {
            searchValue: query,
            ip: data.ip,
            city: data.city,
            lat: data.latitude,
            lng: data.longitude,
          },
        ]);
      } catch (e) {
        console.error("Can't fetch data ...");
      }
    }
    getSearchData();
  }

  useEffect(() => {
    sessionStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  return (
    <div className={styles.container}>
      <InfoBox title="Your location" area="user-info">
        {userDataAvailable ? (
          <>
            <p>IP: {userData.ip}</p>
            <p>{userData.city}</p>
            <p>{userData.latitude}</p>
            <p>{userData.longitude}</p>
          </>
        ) : (
          <p>Loading ...</p>
        )}
      </InfoBox>
      <Map
        lat={userDataAvailable && userData.latitude}
        lng={userDataAvailable && userData.longitude}
        area="user-map"
      />
      <SearchBar area="search" handleSearch={handleSearch} />
      <InfoBox title="Search result" area="last-info">
        {searchDataAvailable ? (
          <>
            <p>https://google.com</p>
            <p>IP: {searchData.ip}</p>
            <p>{searchData.city}</p>
            <p>{searchData.latitude}</p>
            <p>{searchData.longitude}</p>
          </>
        ) : (
          <p>You have to search something first...</p>
        )}
      </InfoBox>
      <Map
        lat={searchDataAvailable && searchData.latitude}
        lng={searchDataAvailable && searchData.longitude}
        area="last-map"
      />
      <InfoBox title="Search history" area="history" justifyTop={true}>
        {searchHistory.length > 0 &&
          searchHistory.map((item) => {
            return <HistoryItem item={item} key={nanoid()} />;
          })}
      </InfoBox>
    </div>
  );
}

export default App;
