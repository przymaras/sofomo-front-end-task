import { useEffect, useState } from "react";

function useDataFetcher(url) {
  const [data, setData] = useState([]);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    if (url) {
      setIsAvailable(false);
      fetch(url)
        .then((res) => {
          if (res.ok) return res.json();
          else throw Error("Error while fetching data...");
        })
        .then((data) => {
          setData(data);
          setIsAvailable(true);
        })
        .catch((err) => console.error(err.message));
    }
  }, [url]);

  return [data, isAvailable];
}

export { useDataFetcher };
