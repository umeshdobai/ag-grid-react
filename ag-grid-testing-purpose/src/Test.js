import React, {Component} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

import './Teststyle.css'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import "ag-grid-community/dist/styles/ag-theme-fresh.css";

export default class extends Component {
    constructor(props) {
        super(props);

        this.athleteVisible = true;
        this.ageVisible = true;
        this.countryVisible = true;
        this.rowData = null;
        this.state = this.createState();
    }

    createState() {
        const topOptions = {alignedGrids: []};
        const bottomOptions = {alignedGrids: []};

        topOptions.alignedGrids.push(bottomOptions);
        bottomOptions.alignedGrids.push(topOptions);

        return {
            topOptions,
            bottomOptions,
            columnDefs: [
                {
                 headerName: "container",
                children:[
                  {
                    headerCheckboxSelection: true,
                    checkboxSelection: true,
                    width: 30,
                    pinned: "left"
                  },
                  {
                    headerName: "Athlete",
                    hide: !this.athleteVisible,
                    field: "athlete",
                    filter: "agTextColumnFilter",
                    width: 150,
                    cellClass: "cell-wrap-text",
                    autoHeight: true,
                    headerCheckboxSelectionFilteredOnly: true,
                    cellRenderer:"",
                    filterParams: {
                      cellHeight: 20,
                      debounceMs: 1000
                    },
                    headerComponentParams : {
                      template:
                      '<div class="ag-cell-label-container" role="presentation">' +
                      '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
                      '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
                      '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order" ></span>' +
                      '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon" ></span>' +
                      '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon" ></span>' +
                      '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon" ></span>'+
                      '     <span ref="eText" class="ag-header-cell-text" role="columnheader"></span>' +

                      '  </div>' +
                      '</div>'
                      }
                  },
                  {
                    headerName: "Age",
                    field: "age",
                    filter: "agNumberColumnFilter",
                    width: 90,
                    hide: !this.ageVisible
                  },
                  {
                    headerName: "Country",
                    field: "country",
                    filter: "agTextColumnFilter",
                    width: 150,
                    hide: !this.countryVisible
                  },
                  {
                    headerName: "Year",
                    field: "year",
                    filter: "agNumberColumnFilter",
                    width: 90,
                    cellStyle: { backgroundColor: "" }
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
                    field: "sport" ,
                    width: 110,
                    filter: "agNumberColumnFilter",
                    filterParams: { suppressMiniFilter: true },
                    
                    
                  },
                  {
                    headerName: "Gold",
                    field: "gold",
                    filter: "agNumberColumnFilter",
                    width: 100,
                  },
                  {
                    headerName: "Silver",
                    field: "silver",
                    filter: "agNumberColumnFilter",
                    width: 100,
                  },
                  {
                    headerName: "Bronze",
                    field: "bronze",
                    filter: "agNumberColumnFilter",
                    width: 100,
                  },
                  {
                    headerName: "Total",
                    field: "total",
                    filter: "agNumberColumnFilter",
                    width: 100,
                  }]
                }     
            ],
            defaultColDef: {
                resizable: true,
                sortable: true,
              },
              autoGroupColumnDef: {
                headerName: "Athlete",
                field: "athlete",
                rowDrag: true,
                cellRendererParams: { checkbox: true },
                headerCheckboxSelection: true,
                width: 250
              },
            rowSelection: "multiple",
            rowData: this.rowData,
            rowHeight: 275,
            value: "" ,
            selectValue: "",
            show: false, //This is for modal
            saveViewArray: [], //This is for save view Array
            saveViewValue: "",
            saveViewDelete: "",
            paginationValue: "",
            paginationCurrentValue: "",
            afterFilterArray: [], //This array stores the filtered nodes
            rowBuffer: 20, //This is for row virtualization
            methods: {
              onClickFilter(){
                console.log("Filter icon is clicked")
              }
            }
        };
    }

    onGridReady(params) {
        this.gridApi = params.api;// It will fetch all APIs
        this.gridColumnApi = params.columnApi;
        console.log(this.gridApi)
        this.topGrid = params;
        var httpRequest = new XMLHttpRequest();
        httpRequest.open('GET', 'https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json');
        httpRequest.send();
        httpRequest.onreadystatechange = function() {
            if (httpRequest.readyState === 4 && httpRequest.status === 200) {
                var httpResult = JSON.parse(httpRequest.responseText);
                this.rowData = httpResult;
                this.setState(this.createState.bind(this));
                this.setState({paginationValue: this.gridApi.paginationGetRowCount()});
                this.setState({paginationCurrentValue: this.gridApi.getFirstDisplayedRow()});
                this.gridApi.paginationSetPageSize(this.state.paginationValue);//page size is full
            }
        }.bind(this);
    }

      //Refresh cells
      refreshCell = () => {
        this.gridApi.deselectAll();
        this.gridApi.refreshCells(this.params); 
        this.gridApi.paginationGoToFirstPage(); 
      }

      //Filter
      clearFilters () {
        
        this.gridApi.deselectAll();
        document.getElementById("dropdown-select").value = ""
        this.gridApi.setQuickFilter(document.getElementById("dropdown-select").value)
        this.gridApi.setFilterModel(window.savedModel);
        this.gridApi.onFilterChanged();
      }

      //Filter reset
      quickFilterClear = (e) => {
        this.setState({value: ""})
        this.gridApi.deselectAll();
      }

      //This is for column resized
      onColumnResized() {
        this.gridApi.resetRowHeights();
      }
      
      //For Quick Filter
      onFilterTextBoxChanged = () => {
        this.gridApi.setQuickFilter(document.getElementById('filter-text-box').value);
      }

      //Dropdown filter
      filterDropDown = (e) => {
        this.gridApi.setQuickFilter(e.target.value);
        this.setState({saveViewDelete: e.target.value});
        
      }

      //Quick Look 
      onChange = (event) => {
        this.setState({value: event.target.value})
        // if(event.target.value.length != 0){
        //   this.gridApi.forEachNode( function(rowNode, index) {
        //     if(rowNode.data.athlete.toLowerCase().includes(event.target.value)){
        //       //console.log(rowNode);  
        //       rowNode.setSelected(true);
        //     }
        //     if(rowNode.data.age == event.target.value){
        //       rowNode.setSelected(true);
               
        //     }
        //     if(rowNode.data.athelete !== event.target.value || rowNode.data.age !== event.target.value){
        //       event.target.style.backgroundColor = "red" 
        //     }
        // });
        // }
        // else{
          
        //   this.gridApi.deselectAll();
        //   event.target.style.backgroundColor = "white" 
        // }
        
        var rowNode = this.gridApi.getDisplayedRowAtIndex(0);
        if(rowNode === undefined){
          event.target.style.backgroundColor = "red" 
        }
        else{
          event.target.style.backgroundColor = "white" 
        }
      }

      //This is for handling modal
      handleShow = () => {
        this.setState({show: true});
      }
      handleClose = () => {
        this.setState({show: false});
      }

      //onChnage method of modal
      modalChange = (e) => {
          this.setState({saveViewValue: e.target.value})
      }

      //save button of modal
      handleSaveOfSaveView = () => {
        if(this.state.saveViewValue !== ""){
          console.log(this.state.saveViewValue);
          this.state.saveViewArray.push(this.state.saveViewValue);
          console.log(this.state.saveViewArray);
          this.setState({show: false});
        }
        this.setState({show: false});
      }

      //Delete save view
      deleteSaveView = () => {
        if(document.getElementById("dropdown-select").value !== "")
        {
          console.log("drop down selected",this.state.saveViewDelete)
          let temp = []
          temp = this.state.saveViewArray.filter( data => data !== this.state.saveViewDelete)
          this.setState({saveViewArray: temp})
          document.getElementById("dropdown-select").value = ""
          this.gridApi.setQuickFilter(document.getElementById("dropdown-select").value)
        }
        
      }

      //This is for quick look navigation
      navigateToNextRow = () => {
        this.gridApi.navigateToNextCell();
      }

      //This is set default view button
      setDefaultView = () => {
        console.log("clicked set default view")
      }

      //This is delete default view button
      deleteDefaultView = () => {
        console.log("clicked delete default view")
      }

    // Warning - mutating the state is not recommended from react, doing it for example purposes
    onCbAthlete(e) {
        this.athleteVisible = !this.athleteVisible;
        this.setState(this.createState.bind(this));
    }

    onCbAge(e) {
        this.ageVisible = !this.ageVisible;
        this.setState(this.createState.bind(this));
    }

    onCbCountry(e) {
        this.countryVisible = !this.countryVisible;
        this.setState(this.createState.bind(this));
    }

    onBtForEachNodeAfterFilter = () => {
      console.log("### api.forEachNodeAfterFilter() ###");
      this.gridApi.forEachNodeAfterFilter(this.printNode);
    }

    printNode = (node, index) => {
      if (node.group) {
        //console.log(index + " -> group: " + node.key);
      } else {
        //console.log(index + " -> data: " + node.data.country + ", " + node.data.athlete);
        this.state.afterFilterArray.push(node)
        if(index === 0){
          node.setSelected(true)
        }
        
      }
    }

    navigateToNextRow = () => {
        console.log(this.state.afterFilterArray)
    }
  

    render() {
        return (
            <div>
                

                <div style={{
                height: "500px",
                width: "1150px",
                marginLeft: "100px",
                marginTop: "100px"
              }} className="ag-theme-fresh" >
                  <div className="select-box">
                    {/* <label>pages :</label>&nbsp;([{this.state.paginationCurrentValue}] to [] of [{this.state.paginationValue}])&nbsp; */}
                    <label>Saved Views </label>&nbsp;
                    <select onChange={this.filterDropDown} id="dropdown-select">
                      <option value="">--Select view--</option>
                      {this.state.saveViewArray.map( (data) => {
                        return(
                        <option key={data}>{data}</option>
                        )
                      })}
                    </select>&nbsp;
                    <img  data-toggle="tooltip" data-placement="top" title="Add view" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTfzcvt0VBix8ntVC8fKIj7VoI8IR-9kVTsE5E346ZsO1HnP116" width="20px" onClick={this.handleShow} />
                  
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <label>View Name</label>&nbsp;
                            <input type="text" value={this.state.saveViewValue} onChange={this.modalChange} />
                        </Modal.Body>
                        <Modal.Footer>  
                          <button variant="primary" onClick={this.handleSaveOfSaveView}>
                            Save
                          </button>
                          <button variant="secondary" onClick={this.handleClose}>
                            Cancel
                          </button>
                        </Modal.Footer>
                    </Modal>
                    
                    <img src="https://cdn2.iconfinder.com/data/icons/file-and-folder-25/64/refresh-update-file-data-512.png" width="20px" />
                    <img  data-toggle="tooltip" data-placement="top" title="Delete view" src="https://img.icons8.com/color/452/delete-file.png" width="20px" onClick={this.deleteSaveView} />&nbsp;
                    {/* <button onClick={this.onBtForEachNodeAfterFilter}>For-Each Node After Filter</button> */}
                    <button onClick={this.setDefaultView}>Set Default view</button>
                    <button onClick={this.deleteDefaultView}>Delete Default view</button>
                    <button id="refreshButton" onClick={this.refreshCell.bind(this)}><i className="fa fa-filter"></i>Refresh</button>&nbsp;
                    <button onClick={this.clearFilters.bind(this)}>
                      <i className="fa fa-times"></i>Clear Filters</button>
                    
                </div>
                
                    <AgGridReact 
                    columnDefs={this.state.columnDefs}
                //defaultColDef={this.state.defaultColDef}
                //components={this.state.components}
                rowData={this.state.rowData}
                //groupIncludeFooter={true}
                //sideBar={true}
                //autoGroupColumnDef={this.state.autoGroupColumnDef}
                //rowHeight={this.state.rowHeight}
                //rowSelection={this.state.rowSelection} 
                //gridOptions={this.state.topOptions} 
                //icons={this.state.icons}
                //methods={this.state.methods}
                //suppressMenuHide={true}
                //pagination={true}
                //rowBuffer={this.state.rowBuffer}
                //rowModelType={this.state.rowModelType}
                //suppressPaginationPanel={true}
                onGridReady={this.onGridReady.bind(this)} />

                <ContextMenu id="some_unique_identifier">
								<MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
								ContextMenu Item 1
								</MenuItem>
								<MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
								ContextMenu Item 2
								</MenuItem>
								<MenuItem divider />
								<MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
								ContextMenu Item 3
								</MenuItem>
						    </ContextMenu>

                <label>Quick Look</label>&nbsp;
              <input type="text" id="filter-text-box" autoComplete="off" value={this.state.value} onInput={this.onFilterTextBoxChanged} onChange={this.onChange}/>&nbsp;
              <FontAwesomeIcon  data-toggle="tooltip" data-placement="top" title="previous" icon="chevron-circle-left" onClick={this.navigateToPreviousRow}/>&nbsp;
              <FontAwesomeIcon  data-toggle="tooltip" data-placement="top" title="next" icon="chevron-circle-right" onClick={this.navigateToNextRow} />&nbsp;
              <i  data-toggle="tooltip" data-placement="top" title="clear" className="fa fa-times-circle"  onClick={this.quickFilterClear}></i>
              <img id="reportImg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRik10ncHrEE6sxdgBjUeibdw_MLqkEd_Gwulh7KD39QpBidzQZ" width="17px" data-toggle="tooltip" data-placement="top" title="Reports" />&nbsp;&nbsp;
              <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/printer-549-570438.png" width="20px" data-toggle="tooltip" data-placement="top" title="Print" />&nbsp;&nbsp;
              <img src="https://icon2.kisspng.com/20180319/ehw/kisspng-microsoft-excel-logo-microsoft-word-microsoft-offi-excel-png-office-xlsx-icon-5ab06a09a50152.6415810315215109216759.jpg" width="20px" data-toggle="tooltip" data-placement="top" title="Export to Excel" />
                </div>
                
            </div>
        );
    }
}
