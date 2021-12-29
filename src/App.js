import styles from "./App.module.css";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import SearchBar from "./components/SearchBar";

const data = {
  ip: "77.65.100.187",
  type: "ipv4",
  continent_code: "EU",
  continent_name: "Europe",
  country_code: "PL",
  country_name: "Poland",
  region_code: "WP",
  region_name: "Greater Poland",
  city: "Poznań",
  zip: "60-001",
  latitude: 52.41360092163086,
  longitude: 16.837390899658203,
  location: {
    geoname_id: 3088171,
    capital: "Warsaw",
    languages: [
      {
        code: "pl",
        name: "Polish",
        native: "Polski",
      },
    ],
    country_flag: "https://assets.ipstack.com/flags/pl.svg",
    country_flag_emoji: "🇵🇱",
    country_flag_emoji_unicode: "U+1F1F5 U+1F1F1",
    calling_code: "48",
    is_eu: true,
  },
};

function App() {
  return (
    <div className={styles.container}>
      <InfoBox title="Your location" area="user-info">
        <p>IP: {data.ip}</p>
        <p>{data.city}</p>
        <p>{data.latitude}</p>
        <p>{data.longitude}</p>
      </InfoBox>
      <Map lat={52.41360092163086} lng={16.837390899658203} area="user-map" />
      <SearchBar area="search" />
      <InfoBox title="Last search" area="last-info">
        <p>https://google.com</p>
        <p>IP: {data.ip}</p>
        <p>{data.city}</p>
        <p>{data.latitude}</p>
        <p>{data.longitude}</p>
      </InfoBox>
      <Map lat={52.41360092163086} lng={16.837390899658203} area="last-map" />
      <InfoBox title="Search history" area="history" justifyTop={true}>
        <div>
          <p>https://google.com</p>
          <p>IP: {data.ip}</p>
          <p>{data.city}</p>
          <p>{data.latitude}</p>
          <p>{data.longitude}</p>
        </div>
        <div>
          <p>https://google.com</p>
          <p>IP: {data.ip}</p>
          <p>{data.city}</p>
          <p>{data.latitude}</p>
          <p>{data.longitude}</p>
        </div>
        <div>
          <p>https://google.com</p>
          <p>IP: {data.ip}</p>
          <p>{data.city}</p>
          <p>{data.latitude}</p>
          <p>{data.longitude}</p>
        </div>
        <div>
          <p>https://google.com</p>
          <p>IP: {data.ip}</p>
          <p>{data.city}</p>
          <p>{data.latitude}</p>
          <p>{data.longitude}</p>
        </div>
        <div>
          <p>https://google.com</p>
          <p>IP: {data.ip}</p>
          <p>{data.city}</p>
          <p>{data.latitude}</p>
          <p>{data.longitude}</p>
        </div>
        <div>
          <p>https://google.com</p>
          <p>IP: {data.ip}</p>
          <p>{data.city}</p>
          <p>{data.latitude}</p>
          <p>{data.longitude}</p>
        </div>
      </InfoBox>
    </div>
  );
}

export default App;
