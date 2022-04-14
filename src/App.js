import React, { useState, useEffect, Fragment } from "react";
import LoadingSpinner from "./LoadingSpinner";
import "./App.css";

function App() {
  const [allHondaCars, setAllHondaCars] = useState([]);
  const [filteredHondaCars, setFilteredHondaCars] = useState(allHondaCars);
  const [countries, setCountries] = useState([]);
  const [countryValue, setCountryValue] = useState("View All");
  const [filterValue, setFilterValue] = useState("");
  const [loading, setLoading] = useState(false);

  const keys = ["Name", "Wmi", "Country", "CreatedOn", "VehicleType"];

  // Calling API
  useEffect(() => {
    setLoading(true);
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Origin", "http://localhost:3000");

    fetch("https://localhost:5001/gethondacars", {
      mode: "cors",
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        // Data is sorted by CreatedOn, and then by WMI
        data.sort(function (a, b) {
          return (
            a["createdOn"].localeCompare(b["createdOn"]) ||
            a["wmi"].localeCompare(b["wmi"])
          );
        });
        setAllHondaCars(data);
        setFilteredHondaCars(data);
        // We get the distinct countries to be displayed in the drop down
        let countriesSet = [...new Set(data.map((d) => d.country))];
        countriesSet.push("View All");
        setCountries(countriesSet);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error getting honda cars: " + error);
        setLoading(false);
      });
  }, []);

  // Function used to determine the color of the teble row
  const isOdd = (num) => {
    return num % 2;
  };

  // Display rows in table
  const getRowsJsx = () => {
    return filteredHondaCars.map((d, i) => {
      const wmi = d.wmi;
      return (
        <tr
          key={wmi}
          style={{
            backgroundColor: isOdd(i) ? "white" : "lightgray",
            borderColor: "#cf0b2d",
            borderWidth: "0",
          }}
        >
          {keys.map((k) => (
            <td key={`${wmi}-${k}`}>
              {
                d[
                  k.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                    letter.toLowerCase()
                  )
                ]
              }
            </td>
          ))}
        </tr>
      );
    });
  };

  // When the Search filter changes, we need to filter the table - the filter is applied to the name, wmi, and vehicle Type
  const handleSearch = (event) => {
    let value = event.target.value.toUpperCase();
    setFilterValue(value);
    let result = [];
    let resultFiltered = [];
    result = allHondaCars.filter((data) => {
      return (
        data.name.search(value) !== -1 ||
        data.wmi.search(value) !== -1 ||
        data.vehicleType.toUpperCase().search(value) !== -1
      );
    });
    if (countryValue !== "") {
      resultFiltered = result.filter((data) => {
        return countryValue.toUpperCase() === "VIEW ALL"
          ? true
          : data.country
          ? data.country === countryValue
          : countryValue === ""
          ? true
          : false;
      });
      setFilteredHondaCars(resultFiltered);
    } else setFilteredHondaCars(result);
  };

  // When the Country changes, we need to filter the table
  const countryChange = (event) => {
    let value = event.target.value.toUpperCase();
    setCountryValue(event.target.value);
    let result = [];
    let resultFiltered = [];
    result = allHondaCars.filter((data) => {
      return value === "VIEW ALL"
        ? true
        : data.country
        ? data.country === value
        : value === ""
        ? true
        : false;
    });
    if (filterValue !== "") {
      resultFiltered = result.filter((data) => {
        return (
          data.name.search(filterValue) !== -1 ||
          data.wmi.search(filterValue) !== -1 ||
          data.vehicleType.toUpperCase().search(filterValue) !== -1
        );
      });
      setFilteredHondaCars(resultFiltered);
    } else setFilteredHondaCars(result);
  };

  // DropDown
  const Dropdown = ({ label, value, options, onChange }) => {
    return (
      <label>
        {label}
        <select value={value} onChange={onChange}>
          {options.map((option) => (
            <option value={option}>{option}</option>
          ))}
        </select>
      </label>
    );
  };

  return (
    <div className="App">
      {loading && <LoadingSpinner />}
      {!loading && allHondaCars && filteredHondaCars && countries && (
        <Fragment>
          <header className="App-header">
            WMI Data - Honda | Total: {filteredHondaCars.length}
          </header>
          <div style={{ display: "flex" }}>
            <div className="Div" style={{ marginLeft: "30%" }}>
              <label>Search:</label>
              <input
                type="text"
                onChange={(event) => handleSearch(event, allHondaCars)}
              />
            </div>
            <div className="Div" style={{ marginRight: "30%" }}>
              <Dropdown
                label="Select Country:"
                options={countries}
                value={countryValue}
                onChange={(event) => countryChange(event, allHondaCars)}
              />
            </div>
          </div>
          <table
            style={{
              borderCollapse: "collapse",
              width: "80%",
              marginLeft: "10%",
              marginRight: "10%",
            }}
          >
            <thead>
              <tr>
                {keys.map((k) => (
                  <th className="TH" key={k}>
                    {k.toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>{getRowsJsx()}</tbody>
          </table>
        </Fragment>
      )}
    </div>
  );
}

export default App;
