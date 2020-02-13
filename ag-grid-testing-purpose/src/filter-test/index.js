"use strict";

import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
//import { AllCommunityModules } from "ag-grid-community/all-modules";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import "ag-grid-community/dist/styles/ag-theme-fresh.css";
import CustomHeader from "./Custom-Header.js";

export default class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //modules: AllCommunityModules,
      columnDefs: [
        {
          headerName: "Athlete",
          field: "athlete",
          width: 100,
          sortable: false
        },
        {
          headerName: "Age",
          field: "age",
          width: 90,
          sortable: false,
        },
        {
          headerName: "Country",
          field: "country",
          width: 120,
          sortable: false,
          suppressMenu: true
        },
        {
          headerName: "Year",
          field: "year",
          width: 90,
          sortable: false
        },
        {
          headerName: "Date",
          field: "date",
          width: 100,
          suppressMenu: true
        },
        {
          headerName: "Sport",
          field: "sport",
          width: 90,
          sortable: false
        },
        {
          headerName: "Gold",
          field: "gold",
          width: 115,
          sortable: false,
          headerComponentParams: { menuIcon: "fa-cog" }
        },
        {
          headerName: "Silver",
          field: "silver",
          width: 90,
          sortable: false
        },
        {
          headerName: "Bronze",
          field: "bronze",
          width: 115,
          suppressMenu: true
        },
        {
          headerName: "Total",
          field: "total",
          width: 90,
          sortable: false
        }
      ],
      rowData: null,
      frameworkComponents: { agColumnHeader: CustomHeader },
      defaultColDef: {
        width: 200,
        headerComponentParams: { menuIcon: "fa-bars" ,width: "200px"},
        sortable: true,
        resizable: true,
        filter: true
      }
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
      "https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json"
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
            height: "500px",
            width: "1150px",
            marginLeft: "100px",
            marginTop: "100px"
          }}
          className="ag-theme-balham"
        >
          <AgGridReact
            modules={this.state.modules}
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}
            suppressMenuHide={true}
            frameworkComponents={this.state.frameworkComponents}
            defaultColDef={this.state.defaultColDef}
            onGridReady={this.onGridReady}
            floatingFilter={true}
          />
        </div>
      </div>
    );
  }
}