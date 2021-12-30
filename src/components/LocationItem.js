function HistoryItem(props) {
  return (
    <div>
      {props.item.searchValue && <p>Query: {props.item.searchValue}</p>}
      <p>IP: {props.item.ip}</p>
      <p>City: {props.item.city}</p>
      <p>Lat: {props.item.latitude}</p>
      <p>Lng: {props.item.longitude}</p>
    </div>
  );
}

export default HistoryItem;
