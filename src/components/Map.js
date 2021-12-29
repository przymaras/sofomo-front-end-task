import styles from "./Map.module.css";
import GoogleMapReact from "google-map-react";
import { IconMarker } from "./icons/IconMarker";

export default function Map(props) {
  const defaultProps = {
    center: {
      lat: props.lat,
      lng: props.lng,
    },
    zoom: 11,
  };

  return (
    <div className={styles.container} style={{ gridArea: props.area }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCHJjrVbhvsnOAiQH7RJRZgZITJWWYmAuU" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <IconMarker lat={props.lat} lng={props.lng} />
      </GoogleMapReact>
    </div>
  );
}
