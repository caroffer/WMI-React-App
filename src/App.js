import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import filterFactory, { selectFilter } from "react-bootstrap-table2-filter";
import "./App.css";

const { SearchBar } = Search;

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  //const [keys, setKeys] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    fetch("https://localhost:44356/api/HondaWMI")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          //setKeys(Object.keys(result[0]));
          result.sort((a, b) =>
            a.createdOn > b.createdOn
              ? 1
              : a.createdOn === b.createdOn
              ? a.wmi > b.wmi
                ? 1
                : -1
              : -1
          );

          let c = [];
          let k = Object.keys(result[0]);
          let selectOptions = [...new Set(result.map((item) => item.country))];

          result.forEach(
            (item) => (item.country = selectOptions.indexOf(item.country))
          );

          setItems(result);

          selectOptions = Object.assign({}, selectOptions);
          k.forEach((key) => {
            if (key == "country") {
              c.push({
                dataField: key,
                text: key,
                sort: true,
                formatter: (cell) => selectOptions[cell],
                filter: selectFilter({
                  options: selectOptions,
                }),
              });
            } else c.push({ dataField: key, text: key, sort: true });
          });

          setColumns(c);

          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  /*  const getRowsJsx = () => {
    return items.map((d) => {
      const wmi = d.WMI;
      return (
        <tr key={wmi}>
              {keys.map((k) => (
                  <td key={`${wmi}-${k}`}>{d[k]}</td>
          ))}
        </tr>
      );
    });
  };*/

  const getTableJsx = () => {
    return [
      <header>WMI Data - Honda | Total: {items.length}</header>,
      <ToolkitProvider keyField="wmi" data={items} columns={columns} search>
        {(props) => (
          <div>
            <SearchBar {...props.searchProps} />
            <hr />
            <BootstrapTable
              striped
              hover
              condensed
              filter={filterFactory()}
              {...props.baseProps}
            />
          </div>
        )}
      </ToolkitProvider>,
      /*                <table className="WMITable">
                    <thead>
                        <tr>
                            {keys.map((k) => (
                                <th key={k}>{k}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>{getRowsJsx()}</tbody>
                </table>*/
    ];
  };

  const getLoadingJsx = () => {
    return <div className="loader"> </div>;
  };

  return (
    <div className="App">{isLoaded ? getTableJsx() : getLoadingJsx()}</div>
  );
}

export default App;
