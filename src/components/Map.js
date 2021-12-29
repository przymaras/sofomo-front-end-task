import styles from "./Map.module.css";
import GoogleMapReact from "google-map-react";
import { IconMarker } from "./icons/IconMarker";

function Map(props) {
  return (
    <div className={styles.container} style={{ gridArea: props.area }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCHJjrVbhvsnOAiQH7RJRZgZITJWWYmAuU" }}
        defaultCenter={props.center}
        defaultZoom={props.zoom}
        center={props.lat ? [props.lat, props.lng] : props.center}
      >
        <IconMarker lat={props.lat} lng={props.lng} />
      </GoogleMapReact>
    </div>
  );
}

Map.defaultProps = {
  center: {
    lat: 59.955413,
    lng: 30.337844,
  },
  zoom: 11,
};

export default Map;
