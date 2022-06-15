import { useEffect, useState, useMemo } from "react";
import "./App.css";

const keys = ["Name", "WMI", "Country", "CreatedOn", "VehicleType"];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://localhost:5001/api/honda").then(res => res.json()).then(data => {
        data.sort((a, b) => a?.CreatedOn.localeCompare(b?.CreatedOn) || a?.WMI.localeCompare(b?.WMI));
        setData(data);
      }).catch(error => console.warn(error)).finally(() => setIsLoading(false));
    }
    fetchData();
  }, []);

  const countries = useMemo(() => {
    const uniqueCountries = new Set(data.map(d => d.Country));
    // sort and filter out empty string.
    return Array.from(uniqueCountries).sort().filter(uc => !!uc);
  }, [data]);

  const filteredData = () => {
    return data.filter(d => keys.some(k => d[k]?.toLowerCase().includes(searchQuery)) && (selectedCountry ? d.Country === selectedCountry : true));
  }

  const getRowsJsx = () => {
    return filteredData().map((d) => {
      const wmi = d.WMI;
      return (
        <tr key={`${wmi}`}>
          {keys.map((k) => (
            <td key={`${wmi}-${k}`}>{d[k]}</td>
          ))}
        </tr>
      );
    });
  };

  return (
    <div className="App">
      {<header>WMI Data - Honda | Total: {filteredData().length}</header>}
      <input placeholder="Search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value.toLowerCase())}></input>
      <select value={selectedCountry} onChange={(event) => setSelectedCountry(event.target.value)}>
        <option key="View All" value="">View All</option>
        {countries.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
        {isLoading ? <div>Loading...</div> : <table>
          <thead>
            <tr>
              {keys.map((k) => (
                <th key={k}>{k}</th>
              ))}
            </tr>
          </thead>
          <tbody>{getRowsJsx()}</tbody>
        </table>}
    </div>
  );
}

export default App;
