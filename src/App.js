import React, { useMemo, useState } from "react";
import useAsync from "./hooks/useAsync.js";
import "./App.css";

const keys = ["Name", "WMI", "Country", "CreatedOn", "VehicleType"];

function App() {
  const { isPending, result: data, error } = useAsync(async () => {
    const res = await fetch("https://localhost:5001/wmi/honda");
    const rawData = await res.json();
    rawData.sort((a, b) => a.WMI?.localeCompare(b.WMI));
    rawData.sort((a, b) => a.CreatedOn?.localeCompare(b.CreatedOn));
    return rawData;
  }, []);

  const countries = useMemo(() => {
    const unique = new Set(data?.map((d) => d.Country) || []);
    return Array.from(unique).sort();
  }, [data]);

  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const filteredData = useMemo(() => {
    if (!data) return data;
    console.log(data, selectedCountry);
    const searchRegex = new RegExp(search, "i");
    return data.filter(
      (d) =>
        (selectedCountry === "" ||
          d.Country === selectedCountry ||
          (d.Country === null && selectedCountry === "NOCOUNTRY")) &&
        keys.some((k) => searchRegex.test(d[k]?.toString()))
    );
  }, [data, search, selectedCountry]);

  if (isPending) {
    return "Loading";
  }

  if (error) {
    return (
      <div className="App error">
        <strong>Error:</strong>
        <p>{error.message}</p>
        <pre>
          <code>{error.stack}</code>
        </pre>
      </div>
    );
  }

  const getRowsJsx = () => {
    return filteredData.map((d) => {
      const wmi = d.WMI;
      return (
        <tr key={wmi}>
          {keys.map((k) => (
            <td key={`${wmi}-${k}`}>{d[k]}</td>
          ))}
        </tr>
      );
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-logo"></div>
        <div className="App-title">WMI Data - Honda | Total: {data.length}</div>
      </header>
      <div className="App-body">
        <div className="App-controls">
          <label htmlFor="App-search-input">Search:</label>
          <input
            id="App-search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option key="View All" value="">
              View All
            </option>
            {countries.map((c) => (
              <option key={c} value={c || "NOCOUNTRY"}>
                {c || "[None]"}
              </option>
            ))}
          </select>
        </div>
        <table className="App-table">
          <thead>
            <tr>
              {keys.map((k) => (
                <th key={k}>{k}</th>
              ))}
            </tr>
          </thead>
          <tbody>{getRowsJsx()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
