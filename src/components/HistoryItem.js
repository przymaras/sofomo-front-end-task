function HistoryItem(props) {
  return (
    <div>
      <p>Query: {props.item.searchValue}</p>
      <p>IP: {props.item.ip}</p>
      <p>City: {props.item.city}</p>
      <p>Lat: {props.item.lat}</p>
      <p>Lng: {props.item.lng}</p>
    </div>
  );
}

export default HistoryItem;
