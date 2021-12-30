import { useEffect, useState } from "react";
import { useDataFetcher } from "./hooks/useDataFetcher";

import styles from "./App.module.css";

import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import SearchBar from "./components/SearchBar";
import LocationItem from "./components/LocationItem";

import { nanoid } from "nanoid";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState(
    sessionStorage.getItem("searchHistory")
      ? JSON.parse(sessionStorage.getItem("searchHistory"))
      : []
  );

  const ipstackKey = "c5bf1cc2f1b52c6c3c63a427ae3cb063";

  const [userIp, userIpAvailable] = useDataFetcher(
    "https://api.ipify.org/?format=json"
  );
  const [userData, userDataAvailable] = useDataFetcher(
    userIpAvailable
      ? `http://api.ipstack.com/${userIp.ip}?access_key=${ipstackKey}`
      : ""
  );
  const [searchData, searchDataAvailable] = useDataFetcher(
    searchQuery
      ? `http://api.ipstack.com/${searchQuery}?access_key=${ipstackKey}`
      : ""
  );

  useEffect(() => {
    if (searchData.ip) {
      setSearchHistory((prevState) => [
        ...prevState,
        {
          searchValue: searchQuery,
          ip: searchData.ip,
          city: searchData.city,
          latitude: searchData.latitude,
          longitude: searchData.longitude,
        },
      ]);
    }
  }, [searchData]);

  useEffect(() => {
    sessionStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  return (
    <div className={styles.container}>
      <InfoBox title="Your location" area="user-info">
        {userDataAvailable ? (
          <LocationItem item={userData} />
        ) : (
          <p>Loading ...</p>
        )}
      </InfoBox>
      <Map
        lat={userDataAvailable && userData.latitude}
        lng={userDataAvailable && userData.longitude}
        area="user-map"
      />
      <SearchBar area="search" handleSearch={setSearchQuery} />
      <InfoBox title="Search result" area="last-info">
        {searchDataAvailable ? (
          <LocationItem item={{ ...searchData, searchValue: searchQuery }} />
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
            return <LocationItem item={item} key={nanoid()} />;
          })}
      </InfoBox>
    </div>
  );
}

export default App;
