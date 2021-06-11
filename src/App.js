import React from "react";
import useAsync from "./hooks/useAsync.js";
import "./App.css";

function App() {
  const keys = ["Name", "WMI", "Country", "CreatedOn", "VehicleType"];
  const { isPending, result: data, error } = useAsync(async () => {
    const res = await fetch("https://localhost:5001/wmi/honda");
    return res.json();
  }, []);

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
    return data.map((d) => {
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
  );
}

export default App;
