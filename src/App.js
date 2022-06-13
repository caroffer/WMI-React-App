import React, { useState, useEffect } from "react";
import "./App.css";

const keys = ["Name", "WMI", "Country", "CreatedOn", "VehicleType"];

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      await fetch("https://localhost:5001/api/honda").then(res => res.json()).then(data => {
        data.sort((a, b) => a?.CreatedOn.localeCompare(b?.CreatedOn) || a?.WMI.localeCompare(b?.WMI));
        setData(data);
      }).catch(error => console.warn(error)).finally(setIsLoading(false))
    }
    fetchData();
  }, [])


  const getRowsJsx = () => {
    return data.map((d) => {
      const wmi = d.wmi;
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
      {<header>WMI Data - Honda | Total: {data.length}</header>}
      <table>
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
  );
}

export default App;
