import React, { useEffect, useState } from "react";
import { rows } from "./data";
import { FetchWithFilters, IContentDoc } from "./actions";
import { IResult } from "./constants/interfaces";
import exportFromJSON from "export-from-json";
import { Spinner } from "react-bootstrap"

export default () => {
  const [state, setState] = useState({
    startDate: "",
    endDate: "",
    NBR_POWER_UNIT: 0,
    DRIVER_TOTAL: 0,
    PHY_STATE: "",
    PC_FLAG: "",
    CARRIER_OPERATION: "",
  });
  const [PAGE_NUMBER, setPageNumber] = useState(1);
  const [MAX_PAGE_NUMBER, setMaxPageNumber] = useState(1);
  const [responseData, setResponseData] = useState<IContentDoc[]>([]);
  const [displayData, setDisplayData] = useState<IContentDoc[]>([]);
  const [loader, setLoader] = useState<boolean>(false);

  const handleSubmit = () => {
    const {
      CARRIER_OPERATION,
      DRIVER_TOTAL,
      NBR_POWER_UNIT,
      PC_FLAG,
      PHY_STATE,
      endDate,
      startDate,
    } = state;
    setLoader(true)
    FetchWithFilters(
      {
        ADD_DATE: { from: startDate, to: endDate },
        CARRIER_OPERATION,
        DRIVER_TOTAL,
        NBR_POWER_UNIT,
        PC_FLAG,
        PHY_STATE,
        PAGE_NUMBER: Number(PAGE_NUMBER),
      },
      (err: any, data: IResult<IContentDoc>) => {
        setLoader(false)
        if (err) console.log("Error occured", err);
        else {
          setDisplayData(data.results.slice((PAGE_NUMBER - 1)*50, 50))
          setResponseData(data.results);
          setMaxPageNumber(Math.ceil(data.results.length / 50))
          setPageNumber(1);
        }
        return null;
      }
    );
  };

  function csvHandler() {
    exportFromJSON({
      data: responseData,
      fileName: "report-01",
      exportType: exportFromJSON.types.csv,
    });
  }

  function exlHandler() {
    exportFromJSON({
      data: responseData,
      fileName: "report-01",
      exportType: exportFromJSON.types.xls,
    });
  }

  useEffect(() => {
    setDisplayData(responseData.slice((PAGE_NUMBER - 1) * 50, (PAGE_NUMBER + 1) * 50))
  }, [PAGE_NUMBER, setDisplayData])

  return (
    <body>
      <div className="filterOptions">
        <div>
          <label>Date Range</label>
          <div>
            <input
              placeholder="Start Date"
              type="date"
              onChange={({ currentTarget: { value } }) =>
                setState({ ...state, startDate: value })
              }
            />
            <input
              placeholder="End Date"
              type="date"
              onChange={({ currentTarget: { value } }) =>
                setState({ ...state, endDate: value })
              }
            />
          </div>
        </div>
        <div>
          <label>NBR_POWER_UNIT</label>
          <input
            type="number"
            onChange={({ currentTarget: { value } }) =>
              setState({ ...state, NBR_POWER_UNIT: Number(value) })
            }
          />
        </div>
        <div>
          <label>DRIVER_TOTAL</label>
          <input
            type="number"
            onChange={({ currentTarget: { value } }) =>
              setState({ ...state, DRIVER_TOTAL: Number(value) })
            }
          />
        </div>
        <div>
          <label>PHY_STATE</label>
          <input
            onChange={({ currentTarget: { value } }) =>
              setState({ ...state, PHY_STATE: value })
            }
          />
        </div>
        <div>
          <label>PC_FLAG</label>
          <input
            onChange={({ currentTarget: { value } }) =>
              setState({ ...state, PC_FLAG: value })
            }
          />
        </div>
        <div>
          <label>CARRIER_OPERATION</label>
          <input
            onChange={({ currentTarget: { value } }) =>
              setState({ ...state, CARRIER_OPERATION: value })
            }
          />
        </div>
      </div>
      <hr />
      <div className="filterButtons">
        <div>
          {loader? <Spinner animation="grow" /> : <button onClick={handleSubmit}>Search</button>}
        </div>
        <div>
          <button onClick={exlHandler}>Export to Excel</button>
          <button onClick={csvHandler}>Export to CSV</button>
        </div>
      </div>
      <div className="filterButtons">
        <p>Showing Page {PAGE_NUMBER} of {MAX_PAGE_NUMBER}</p>
      </div>

      <div className="results">
        <table>
          <thead>
            <tr>
              {rows.map((item) => (
                <td>
                  <strong>{String(item).replace("_", " ")}</strong>
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayData.map((item) => (
              <tr>
                {Object.values(item).map((itemName) => (
                  <td>{itemName}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="paginationButtons">
        <button
          onClick={() => setPageNumber(PAGE_NUMBER - 1)}
          disabled={PAGE_NUMBER === 1}
          style={{ color: PAGE_NUMBER === 1? 'gray' : 'white' }}
        >Previous</button>
        <button
          onClick={() => setPageNumber(PAGE_NUMBER + 1)}
          disabled={PAGE_NUMBER === MAX_PAGE_NUMBER}
          style={{ color: PAGE_NUMBER === MAX_PAGE_NUMBER? 'gray' : 'white' }}
        >Next</button>
      </div>
    </body>
  );
};
