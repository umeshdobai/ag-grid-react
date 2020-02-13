import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-fresh.css";
import { Icon,  Button, Dropdown, Menu, Checkbox } from "antd";
import Paper from "@material-ui/core/Paper";
import { columnDefs, rowData, columnTitle } from "./GridData";
import CustomHeader from "./CustomHeader";
import PartialMatchFilter from "./PartialMatchFilter";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


let minRowHeight = 25;
let currentRowHeight = minRowHeight;
let filterType = "everyone";

class AgGridComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			getRowHeight: function() {
				return currentRowHeight;
			},
			defaultColDef: {
				resizable: true,
				headerComponentParams: { menuIcon: "filter", value: filterType },
				menuTabs: ["filterMenuTab"],
				sortable: true,
				filter: true
			},
			columnTitle: columnTitle,
			columnInfo: [],
			columnData: columnDefs,
			checkedCols: [],
			domLayout: "autoHeight",
			rowDataCount: rowData.length,
			frameworkComponents: {
				agColumnHeader: CustomHeader,
				partialMatchFilter: PartialMatchFilter
			},
			rowModelType: "viewport",
			data: {} //This is storing for right clicked items
		};
	}

	externalFilterChanged(newValue) {
		console.log(newValue, "externalFilterChanged");
		// filterType = newValue;
		this.props.api.onFilterChanged();
	}

	onGridReady = params => {
		this.gridApi = params.api;
		this.gridColumnApi = params.columnApi;

		minRowHeight = 30;
		currentRowHeight = minRowHeight;
		if (!rowData) {
			params.api.showNoRowsOverlay();
		}
		params.api.sizeColumnsToFit();
	};

	printColumnState = () => {
		var columnState = this.gridColumnApi.getColumnState()
		 console.log(columnState);
	}

	onGridSizeChanged(params) {
		var gridHeight = document.getElementsByClassName("ag-body-viewport")[0]
			.offsetHeight;
		var renderedRows = params.api.getRenderedNodes();
		if (renderedRows.length * minRowHeight >= gridHeight) {
			if (currentRowHeight !== minRowHeight) {
				currentRowHeight = minRowHeight;
				params.api.resetRowHeights();
			}
		} else {
			currentRowHeight = Math.floor(gridHeight / renderedRows.length);
			params.api.resetRowHeights();
		}
	}

	onClick = ({ key }) => {
		let colKey = key;
		let removedCols = this.state.checkedCols.includes(colKey);
		if (removedCols) {
			let column = this.state.columnInfo.filter(
				col => col.headerName === colKey
			);
			let index = this.state.checkedCols.findIndex(col => col === key);
			this.state.checkedCols.splice(index, 1);
			this.state.columnData.push(column[0]);
		} else {
			this.state.checkedCols.push(colKey);
			let columnIndex = columnDefs.findIndex(col => {
				return col.headerName === key;
			});
			const filteredColumn = this.state.columnData.splice(columnIndex, 1);
			this.state.columnInfo.push(filteredColumn[0]);
			this.setState({
				columnData: this.state.columnData,
				columnInfo: this.state.columnInfo
			});
		}
		this.gridApi.setColumnDefs(this.state.columnData);
		this.setState({
			checkedCols: this.state.checkedCols,
			columnData: this.state.columnData
		});
	};

	menu = () => {
		return (
			<Menu onClick={this.onClick}>
				{this.state.columnTitle.map((col, index) => (
					<Menu.Item key={col.name}>
						<Checkbox
							checked={this.state.checkedCols.find(
								checks => checks === col.name
							)}
						></Checkbox>
						{col.name}
					</Menu.Item>
				))}
			</Menu>
		);
	};

	clearFilter = () => {
		this.gridApi.setFilterModel(null);
		this.gridApi.onFilterChanged();
	};

	isExternalFilterPresent() {
		return filterType !== "everyone";
	}

	onMenuClicked = () => {
		console.log(this.state.data)
	}

	onCellClicked = (e) => {
		this.setState({data: e.data})
	}

	doesExternalFilterPass(node) {
		console.log(node, "node");
		// switch (filterType) {
		// 	case "lesserThan":
		// 		return node.data.age < 30;
		// 	case "equals":
		// 		return node.data.age >= 30 && node.data.age <= 50;
		// 	case "greaterThan":
		// 		return node.data.age > 50;
		// 	default:
		// 		return true;
		// }
	}

	render() {
		return (
			<div style={{ width: "100%", height: "100%" }}>
				<Paper className="paper-style" elevation={3}>
					<div
						style={{ height: "100%", display: "flex", flexDirection: "column" }}
					>
						<div className="btn-container">
							<div style={{ alignItems: "start" }}>
								<span>Row : {this.state.rowDataCount}</span>
							</div>
							<div>
								<span className="button-group">
									<Button><FontAwesomeIcon  size="xs" icon="filter" />Refresh</Button>
								</span>
								<span className="button-group">
									<Button onClick={this.printColumnState}>Save Find Config</Button>
								</span>
								<span className="button-group">
									<Button>Clear Find</Button>
								</span>
								<span className="button-group">
									<Button onClick={this.clearFilter}><FontAwesomeIcon icon="times" />Clear filter</Button>
								</span>
								<Dropdown.Button
									className="button-group"
									trigger={["click"]}
									overlay={this.menu}
									icon={<Icon type="down" />}
								>
									<FontAwesomeIcon icon="columns" />
									Show/hide columns
								</Dropdown.Button>
							</div>
						</div>
					</div>

					<div
						id="myGrid"
						className="ag-theme-fresh"
						style={{ width: "100%", height: "100%", overflow: "scroll" }}
					>
						<ContextMenuTrigger id="some_unique_identifier">
						<AgGridReact
							defaultColDef={this.state.defaultColDef}
							columnDefs={this.state.columnData}
							rowData={rowData}
							rowSelection="multiple"
							suppressMenuHide={true}
							frameworkComponents={this.state.frameworkComponents}
							getRowHeight={this.state.getRowHeight}
							onGridReady={this.onGridReady}
							domLayout={this.state.domLayout}
							onGridSizeChanged={this.onGridSizeChanged.bind(this)}
							isExternalFilterPresent={this.isExternalFilterPresent}
							doesExternalFilterPass={this.doesExternalFilterPass}
							externalFilterChanged={this.externalFilterChanged}
							getContextMenuItems={this.getContextMenuItems}
							enableSorting={true}
							onCellContextMenu={this.onCellClicked}
						></AgGridReact></ContextMenuTrigger>

						<ContextMenu id="some_unique_identifier" className="context-menu">
								<MenuItem className="menuitems">Load/Unload</MenuItem>

								<MenuItem divider />

								<MenuItem className="menuitems" onClick={this.onMenuClicked}>View Container </MenuItem>
								<MenuItem className="menuitems">Edit Container</MenuItem>
								<MenuItem className="menuitems">Copy Container</MenuItem>
								<MenuItem className="menuitems">Delete Container</MenuItem>

								<MenuItem divider />

								<MenuItem className="menuitems">Manage Workflow</MenuItem>
								<MenuItem className="menuitems">Wokflow History</MenuItem>
								<MenuItem className="menuitems">Publish</MenuItem>
								<MenuItem className="menuitems">Container Version Timeline</MenuItem>
								<MenuItem className="menuitems">Reports</MenuItem>
						</ContextMenu>
					</div>
					<label>Quick Look</label>&nbsp;
              <input type="text"  autoComplete="off" value={this.state.value} onInput={this.onFilterTextBoxChanged} onChange={this.onChange}/>
				</Paper>
			</div>
		);
	}

	// getContextMenuItems(params) {
	// 	console.log("You have Seleted",params.node.data)
	// 	var result = [
	// 	  {
	// 		name: "Load/Unload"
	// 	  },
	// 	  "separator",
	// 	  {
	// 		 name: "Add Container"
	// 	  },
	// 	  "separator",
	// 	  {
	// 		  name: "View container"
	// 	  },
	// 	  {
	// 		  name: "Add Conatiner Version"
	// 	  },
	// 	  {
	// 		name: "Edit Container ("+params.node.data.code+")",
	// 		action: function() {
	// 		  //window.alert("Alerting about " + params.value);
	// 		},
	// 		cssClasses: ["redFont", "bold"]
	// 	  },
	// 	  {
	// 		name: "Copy Container " ,
	// 		action: function() {
	// 		  //window.alert("Alerting about " + params.value);
	// 		},
	// 		cssClasses: ["redFont", "bold"]
	// 	  },
	// 	  {
	// 		name: "Delete Container " ,
	// 		action: function() {
	// 		  //window.alert("Alerting about " + params.value);
	// 		},
	// 		cssClasses: ["redFont", "bold"]
	// 	  },
	// 	  "separator",
	// 	  {
	// 		name: "Detailed Usage"
	// 	  },
	// 	  "separator",
	// 	  {
	// 		name: "Add to Scratchpad"
	// 	  },
	// 	  {
	// 		  name: "Show to Scratchpad"
	// 	  },
	// 	  "separator",
	// 	  {
	// 		  name: "Manage Workflow"
	// 	  },
	// 	  {
	// 		  name: "Workflow History"
	// 	  },
	// 	  {
	// 		  name: "Publish"
	// 	  },
	// 	  {
	// 		  name: "Conatainer Version Timeline"
	// 	  },
	// 	  {
	// 		  name: "Reports"
	// 	  },
	// 	];
	// 	return result;
	//   }
	}
	
	


export default AgGridComponent;
