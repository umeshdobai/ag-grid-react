"use strict";

import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "@ag-grid-community/react";
import { AllModules } from "@ag-grid-enterprise/all-modules";
import "@ag-grid-community/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css";

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modules: AllModules,
      columnDefs: [
        {
          headerName: "Athlete",
          field: "athlete",
          width: 150
        },
        {
          headerName: "Age",
          field: "age",
          width: 90
        },
        {
          headerName: "Country",
          field: "country",
          width: 120
        },
        {
          headerName: "Year",
          field: "year",
          width: 90
        },
        {
          headerName: "Date",
          field: "date",
          width: 110
        },
        {
          headerName: "Sport",
          field: "sport",
          width: 110
        },
        {
          headerName: "Gold",
          field: "gold",
          width: 100
        },
        {
          headerName: "Silver",
          field: "silver",
          width: 100
        },
        {
          headerName: "Bronze",
          field: "bronze",
          width: 100
        },
        {
          headerName: "Total",
          field: "total",
          width: 100
        }
      ],
      rowData: []
    };
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const httpRequest = new XMLHttpRequest();
    const updateData = data => {
      this.setState({ rowData: data });
    };

    httpRequest.open(
      "GET",
      "https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinners.json"
    );
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        updateData(JSON.parse(httpRequest.responseText));
      }
    };
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div
          id="myGrid"
          style={{
            height: "100%",
            width: "100%"
          }}
          className="ag-theme-balham"
        >
          <AgGridReact
            modules={this.state.modules}
            columnDefs={this.state.columnDefs}
            enableRangeSelection={true}
            allowContextMenuWithControlKey={true}
            getContextMenuItems={this.getContextMenuItems}
            onGridReady={this.onGridReady}
            rowData={this.state.rowData}
          />
        </div>
      </div>
    );
  }

  getContextMenuItems(params) {
    var result = [
      {
        name: "Alert " + params.value,
        action: function() {
          window.alert("Alerting about " + params.value);
        },
        cssClasses: ["redFont", "bold"]
      },
      {
        name: "Always Disabled",
        disabled: true,
        tooltip: "Very long tooltip, did I mention that I am very long, well I am! Long!  Very Long!"
      },
      {
        name: "Country",
        subMenu: [
          {
            name: "Ireland",
            action: function() {
              console.log("Ireland was pressed");
            },
            icon: createFlagImg("ie")
          },
          {
            name: "UK",
            action: function() {
              console.log("UK was pressed");
            },
            icon: createFlagImg("gb")
          },
          {
            name: "France",
            action: function() {
              console.log("France was pressed");
            },
            icon: createFlagImg("fr")
          }
        ]
      },
      {
        name: "Person",
        subMenu: [
          {
            name: "Niall",
            action: function() {
              console.log("Niall was pressed");
            }
          },
          {
            name: "Sean",
            action: function() {
              console.log("Sean was pressed");
            }
          },
          {
            name: "John",
            action: function() {
              console.log("John was pressed");
            }
          },
          {
            name: "Alberto",
            action: function() {
              console.log("Alberto was pressed");
            }
          },
          {
            name: "Tony",
            action: function() {
              console.log("Tony was pressed");
            }
          },
          {
            name: "Andrew",
            action: function() {
              console.log("Andrew was pressed");
            }
          },
          {
            name: "Kev",
            action: function() {
              console.log("Kev was pressed");
            }
          },
          {
            name: "Will",
            action: function() {
              console.log("Will was pressed");
            }
          },
          {
            name: "Armaan",
            action: function() {
              console.log("Armaan was pressed");
            }
          }
        ]
      },
      "separator",
      {
        name: "Windows",
        shortcut: "Alt + W",
        action: function() {
          console.log("Windows Item Selected");
        },
        icon: '<img src="../images/skills/windows.png"/>'
      },
      {
        name: "Mac",
        shortcut: "Alt + M",
        action: function() {
          console.log("Mac Item Selected");
        },
        icon: '<img src="../images/skills/mac.png"/>'
      },
      "separator",
      {
        name: "Checked",
        checked: true,
        action: function() {
          console.log("Checked Selected");
        },
        icon: '<img src="../images/skills/mac.png"/>'
      },
      "copy",
      "separator",
      "chartRange"
    ];
    return result;
  }
}

function createFlagImg(flag) {
  return '<img border="0" width="15" height="10" src="https://flags.fmcdn.net/data/flags/mini/' + flag + '.png"/>';
}

render(<GridExample></GridExample>, document.querySelector("#root"));

export default GridExample