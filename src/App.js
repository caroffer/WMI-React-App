import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const keys = ["Name", "WMI", "Country", "CreatedOn", "VehicleType"];

  const [jsonData, setJsonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("View All");
  const [filteredData, setFilteredData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Number of items to show per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7190/api/honda_wmi"
        );
        console.log(response);
        setJsonData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply filtering when the selected country changes
  useEffect(() => {
    const filtered = jsonData.filter((item) =>
      selectedCountry === "Other Countries"
        ? item.Country === null
        : selectedCountry === "View All"
        ? true
        : item.Country === selectedCountry
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [selectedCountry, jsonData]);

  // Sort the filtered data by CreatedOn and then by WMI
  useEffect(() => {
    const sorted = filteredData.sort((a, b) => {
      if (a.CreatedOn === b.CreatedOn) {
        return a.WMI.localeCompare(b.WMI);
      }
      return new Date(a.CreatedOn) - new Date(b.CreatedOn);
    });
    setSortedData(sorted);
  }, [filteredData, jsonData]);

  const filteredSearchData = sortedData.filter(
    (item) =>
      item.Name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.WMI.toLowerCase().includes(searchText.toLowerCase()) ||
      (item.Country &&
        item.Country.toLowerCase().includes(searchText.toLowerCase())) ||
      item.CreatedOn.toLowerCase().includes(searchText.toLowerCase()) ||
      item.VehicleType.toLowerCase().includes(searchText.toLowerCase())
  );

  // Get total number of pages
  const totalPages = Math.ceil(filteredSearchData.length / itemsPerPage);

  // Get current items to display based on pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredSearchData.slice(startIndex, endIndex);

  // Function to handle search input
  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  // Function to handle country selection
  const handleCountrySelect = (event) => {
    setSelectedCountry(event.target.value);
  };

  // Function to handle pagination page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Get distinct countries for select options
  const distinctCountries = [
    "View All",
    ...new Set(jsonData.map((item) => item.Country)),
  ];

  return (
    <div className="App table-responsive container py-2">
      <h2 className="text-center mb-4">
        WMI Data - Honda | Total: {jsonData.length}
      </h2>
      <div className="row mb-3">
        <div className="col-md-6 offset-md-3">
          <input
            type="text"
            className="form-control"
            value={searchText}
            onChange={handleSearch}
            placeholder="Search..."
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6 offset-md-3">
          <select
            className="form-select"
            value={selectedCountry}
            onChange={handleCountrySelect}
          >
            {distinctCountries.map((country) => (
              <option key={country} value={country}>
                {country === null ? "Other Countries" : country}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <>
          <div className="spinner-container d-flex justify-content-center">
            <div className="loading-spinner align-center "></div>
          </div>
        </>
      ) : (
        <>
          <div className="row">
            <div className="col-md-10 offset-md-1">
              {filteredSearchData.length === 0 ? (
                <div className="alert alert-dark text-center">
                  No matching records found.
                </div>
              ) : (
                <>
                  <table className="table table-hover table-bordered rounded shadow-lg p-3 mb-5 table-dark">
                    <thead>
                      <tr>
                        {keys.map((k) => (
                          <th key={k}>{k}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((d) => (
                        <tr key={d.WMI}>
                          {keys.map((k) => (
                            <td key={`${d.WMI}-${k}`}>{d[k]}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {totalPages > 1 ? (
                    <nav>
                      <ul className="pagination justify-content-center ">
                        {Array.from({ length: totalPages }, (_, index) => (
                          <li
                            key={index + 1}
                            className={`page-item ${
                              currentPage === index + 1 ? "active " : ""
                            }`}
                            onClick={() => handlePageChange(index + 1)}
                          >
                            <button className="page-link">{index + 1}</button>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  ) : null}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
