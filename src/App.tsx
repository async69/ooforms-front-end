import exportFromJSON from "export-from-json";
import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FetchWithFilters, IContentDoc } from "./actions";
import { IResult } from "./constants/interfaces";
import { rows } from "./data";

export default () => {
  const [state, setState] = useState({
    startDate: "21-JAN-02",
    endDate: "22-JAN-02",
    NBR_POWER_UNIT: 1,
    DRIVER_TOTAL: 1,
    PHY_STATE: "CO",
    PC_FLAG: "N",
    CARRIER_OPERATION: "C",
  });
  const [PAGE_NUMBER, setPageNumber] = useState(1);
  const [responseData, setResponseData] = useState<IContentDoc[]>([]);
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
        if (err) console.log("Error occured", err);
        else {
          console.log("here", data);
          setResponseData(data.results);
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

  return (
    <body>
      <div>
        <label>Date Range</label>
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
      <div>
        <Button onClick={handleSubmit}>Search</Button>
      </div>
      <div>
        <Button>Previous</Button> <Button>Next</Button>
      </div>
      <div>
        <Button onClick={exlHandler}>Export to Excel</Button>
        <Button onClick={csvHandler}>Export to CSV</Button>
      </div>

      <Table>
        <thead>
          <tr>
            {rows.map((item) => (
              <td style={{ paddingRight: 50, paddingLeft: 50, width: 100 }}>
                <strong>{item}</strong>
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {responseData.map((item) => (
            <tr>
              {Object.values(item).map((itemName) => (
                <td style={{ paddingRight: 50, paddingLeft: 50, width: 100 }}>
                  {itemName}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </body>
  );
};
