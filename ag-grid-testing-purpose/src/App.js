import React,{ Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import Highlighter from "react-highlight-words";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import "ag-grid-community/dist/styles/ag-theme-blue.css";
import "ag-grid-community/dist/styles/ag-theme-fresh.css";
import './App.css';
import Test from './Test';
import GridExample from './filter-test';
//import CustomDateComponent from './CustomDateComponent';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronCircleRight, faChevronCircleLeft,  } from '@fortawesome/free-solid-svg-icons';

library.add(faChevronCircleRight, faChevronCircleLeft, );


var ageVisible = true

class App extends Component {
    constructor(props) {
        super(props); 
        console.log("inisdkj",ageVisible)
        this.state = {
            ageVisible: ageVisible,
            rowData: null,
          columnDefs: [
            {
              headerName: "Athlete",
              field: "athlete",
              width: 150,
              filter: "agTextColumnFilter",
              cellClass: "cell-wrap-text",
              autoHeight: true,
              headerCheckboxSelection: true,
              headerCheckboxSelectionFilteredOnly: true,
              checkboxSelection: true,
              filterParams: {
                cellHeight: 20,
                values: irishAthletes(),
                debounceMs: 1000
              }
            },
            {
              headerName: "Age",
              field: "age",
              width: 90,
              hide: this.ageVisible
              
            },
            {
              headerName: "Country",
              field: "country",
              width: 150,
              cellRenderer: "countryCellRenderer",
              keyCreator: countryKeyCreator,
              filter: "agTextColumnFilter"
            },
            {
              headerName: "Year",
              field: "year",
              width: 90
            },
            {
              headerName: "Date",
              field: "date",
              width: 160,
              filter: "agDateColumnFilter",
              
              //This is for date Filteration
              filterParams: {
                comparator: function(filterLocalDateAtMidnight, cellValue) {
                  var dateAsString = cellValue;
                  var dateParts = dateAsString.split("/");
                  var cellDate = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
                  if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
                    return 0;
                  }
                  if (cellDate < filterLocalDateAtMidnight) {
                    return -1;
                  }
                  if (cellDate > filterLocalDateAtMidnight) {
                    return 1;
                  }
                }
              }
            },
            {
              headerName: "Sport",
              field: "sport",
              width: 110,
              filter: "agTextColumnFilter",
              filterParams: { suppressMiniFilter: true },
              
              
            },
            {
              headerName: "Gold",
              field: "gold",
              width: 100,
              filter: "agNumberColumnFilter"
            },
            {
              headerName: "Silver",
              field: "silver",
              width: 100,
              filter: "agNumberColumnFilter"
            },
            {
              headerName: "Bronze",
              field: "bronze",
              width: 100,
              filter: "agNumberColumnFilter"
            },
            {
              headerName: "Total",
              field: "total",
              width: 100,
              filter: "agNumberColumnFilter"
            }
          ],
          defaultColDef: {
            resizable: true,
            sortable: true,
            filter: true
          },
          rowSelection: "multiple",
          //frameworkComponents: { agDateInput: CustomDateComponent },    
          components: { countryCellRenderer: countryCellRenderer },
          rowHeight: 275,
          value: "" ,
          autoGroupColumnDef: {
            headerName: "Athlete",
            field: "athlete",
            width: 200,
            cellRenderer: "agGroupCellRenderer",
            cellRendererParams: { footerValueGetter: '"Total (" + x + ")"' }
          }
        };
      }

      
    
      //This is for fetching all the APIs 
      onGridReady = params => {
        this.gridApi = params.api;// It will fetch all APIs
        this.gridColumnApi = params.columnApi;
        console.log(params.columnApi)
        const httpRequest = new XMLHttpRequest();
        const updateData = data => {
          patchData(data);
          this.setState({ rowData: data });
          console.log(this.state.rowData)
        };
    
        
        httpRequest.open(
          "GET",
          "https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json"
        );
        httpRequest.send();
        httpRequest.onreadystatechange = () => {
            //httpRequest.readyState = 4 (request finished and response is ready)
            //httpRequest.status = 200 ("OK")
          if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            updateData(JSON.parse(httpRequest.responseText));
          }
        };
      };
    
      //This is for column resized
      onColumnResized() {
        this.gridApi.resetRowHeights();
      }
      
      //For Quick Filter
      onFilterTextBoxChanged = () => {
        this.gridApi.setQuickFilter(this.state.value);
      }

      onChange = (event) => {
        this.setState({value: event.target.value})
        
      }

      onCbAge = (e) => {

        console.log(this.state.columnDefs[1])
        ageVisible= this.state.ageVisible
        console.log(ageVisible)
          this.setState({ageVisible: !this.state.ageVisible} , () => {console.log("agevisible=",this.state.ageVisible)})                                              
          
      }

      render() {
        

        return (
        
        //   <div style={{ width: "100%", height: "100%" }}>
        //     <div
        //       id="myGrid"
        //       style={{
        //         height: "500px",
        //         width: "1150px",
        //         marginLeft: "100px",
        //         marginTop: "100px"
        //       }}
        //       className="ag-theme-fresh"
        //     >
        //        <ReactMultiSelectCheckboxes options={options} placeholder="Search column name" isFocused={false} styles={customStyles}/> 
        //        <input type="checkbox"  onChange={this.onCbAge}  checked={this.state.ageVisible}/>Age
        //       <AgGridReact
        //         columnDefs={this.state.columnDefs}
        //         defaultColDef={this.state.defaultColDef}
        //         components={this.state.components}
        //         rowData={this.state.rowData}
        //         onColumnResized={this.onColumnResized.bind(this)}
        //         onGridReady={this.onGridReady}
        //         groupIncludeFooter={true}
        //         sideBar={true}
        //         autoGroupColumnDef={this.state.autoGroupColumnDef}
        //         frameworkComponents={this.state.frameworkComponents}
        //         floatingFilter={true}
        //         rowHeight={this.state.rowHeight}
        //         rowSelection={this.state.rowSelection}
            
        //       ></AgGridReact>
              
        //       <label>Quick Look</label>&nbsp;
        //       <input type="text" id="filter-text-box"  onInput={this.onFilterTextBoxChanged} onChange={this.onChange}/>
        //     </div>
        //   </div>
        <div><Test /></div>
        // <div><GridExample /></div>
        );
      }
}


function irishAthletes() {
    return [
      "John Joe Nevin",
      "Katie Taylor",
      "Paddy Barnes",
      "Kenny Egan",
      "Darren Sutherland",
      "Margaret Thatcher",
      "Tony Blair",
      "Ronald Regan",
      "Barack Obama"
    ];
  }
  function countryCellRenderer(params) {
    return params.value.name + " (" + params.value.code + ")";
  }
  function countryKeyCreator(params) {
    var countryObject = params.value;
    var key = countryObject.name;
    return key;
  }
  function patchData(data) {
    data.forEach(function(row) {
      var countryName = row.country;
      var countryCode = countryName.substring(0, 2).toUpperCase();
      row.country = {
        name: countryName,
        code: countryCode
      };
    });
  }
export default App;


