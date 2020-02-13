
import AgGridCheckboxComponent from './AgGridCheckboxComponent'
import AgGridVittualCheckBox from './AgGridVittualCheckBox';

export const columnDefs = [
	{
		headerCheckboxSelection: true,
		headerCheckboxSelectionFilteredOnly: true,
		checkboxSelection: true,
		width: 110,
		cellClass: "cell-wrap-text",
		suppressMenu: true,
		sortable: false,
		pinned: "left",
		resizable: false
	},
	{
		headerName: "Code",
		field: "code",
		minWidth: 120,
		textAlign: "left",
		filter: "partialMatchFilter",
		menuTabs: ["filterMenuTab"]
	},
	{
		headerName: "Name",
		field: "name",
		minWidth: 115,
		filter: "partialMatchFilter",
		cellClass: "cell-wrap-text"
	},
	{
		headerName: "Is Virtual",
		field: "virtual",
		minWidth: 150,
		filter: "partialMatchFilter",
		cellClass: "cell-wrap-text",
		cellRendererFramework: AgGridVittualCheckBox
	},
	{
		headerName: "Version",
		field: "version",
		minWidth: 120,
		filter: "partialMatchFilter",
		cellClass: "cell-wrap-text"
	},
	{
		headerName: "Eff. Date",
		field: "EffDate",
		minWidth: 150,
		filter: "partialMatchFilter",
		cellClass: "cell-wrap-text"
	},
	{
		headerName: "End Date",
		field: "EndDate",
		minWidth: 150,
		filter: "partialMatchFilter",
		cellClass: "cell-wrap-text"
	},
	{
		headerName: "Status",
		field: "status",
		minWidth: 100,
		filter: "partialMatchFilter",
		cellClass: "cell-wrap-text"
	},
	{
		headerName: "Class",
		field: "class",
		minWidth: 100,
		filter: "partialMatchFilter",
		cellClass: "cell-wrap-text"
	},
	{
		headerName: "Container Weight",
		field: "weight",
		minWidth: 170,
		filter: "partialMatchFilter",
		cellClass: "cell-wrap-text"
	},
	{
		headerName: "Decomissioned?",
		field: "decommissioned",
		minWidth: 170,
		filter: "partialMatchFilter",
		cellClass: "cell-wrap-text",
		cellRendererFramework: AgGridCheckboxComponent
	}
];

export const rowData = [
	{
		id: 1,
		code: "CONT1",
		name: "bowl",
		virtual: false,
		version: "1",
		EffDate: "15/12/2016",
		EndDate: "",
		status: "PUBLISHED",
		class: "Business",
		weight: 130000,
		decommissioned:  true
	},
	{
		id: 2,
		code: "CONT2",
		name: "bottle",
		virtual: true,
		version: "2",
		EffDate: "16/12/2015",
		EndDate: "",
		status: "PUBLISHED",
		class: "Common",
		weight: 10000,
		decommissioned: false
	},
	{
		id: 3,
		code: "CONT3",
		name: "0608-MC-01",
		virtual: false,
		version: "1",
		EffDate: "1/1/2000",
		EndDate: "",
		status: "DRAFT",
		class: "Business",
		weight: 1000,
		decommissioned: true
	},
	{
		id: 4,
		code: "CONT4",
		name: "0608-BJ-01",
		virtual: true,
		version: "1",
		EffDate: "1/1/2000",
		EndDate: "",
		status: "DRAFT",
		class: "Economy",
		weight: 100,
		decommissioned: false
	},
	{
		id: 5,
		code: "CONT5",
		name: "0608-RJ-01",
		virtual: false,
		version: "3",
		EffDate: "1/1/2010",
		EndDate: "",
		status: "PUBLISHED",
		class: "Business",
		weight: 1000,
		decommissioned: true
	},
	{
		id: 6,
		code: "CONT6",
		name: "0608-RH-01",
		virtual: true,
		version: "1",
		EffDate: "1/1/2000",
		EndDate: "",
		status: "DRAFT",
		class: "Business",
		weight: 1000,
		decommissioned: false
	},
	{
		id: 7,
		code: "CONT7",
		name: "0608-TH-01",
		virtual: false,
		version: "3",
		EffDate: "1/1/2010",
		EndDate: "",
		status: "PUBLISHED",
		class: "Business",
		weight: 1000,
		decommissioned: true
	},
	{
		id: 8,
		code: "CONT8",
		name: "0608-MN-01",
		virtual: true,
		version: "2",
		EffDate: "1/1/2010",
		EndDate: "",
		status: "PUBLISHED",
		class: "Common",
		weight: 1000,
		decommissioned: false
	},
	{
		id: 9,
		code: "CONT9",
		name: "0608-MN-01",
		virtual: false,
		version: "2",
		EffDate: "1/1/2010",
		EndDate: "",
		status: "PUBLISHED",
		class: "Common",
		weight: 1000,
		decommissioned: true
	},
	{
		id: 10,
		code: "CONT10",
		name: "0608-MN-01",
		virtual: true,
		version: "2",
		EffDate: "1/1/2010",
		EndDate: "",
		status: "PUBLISHED",
		class: "Common",
		weight: 1000,
		decommissioned: false
	},
	{
		id: 11,
		code: "CONT11",
		name: "0608-RJ-01",
		virtual: false,
		version: "3",
		EffDate: "1/1/2010",
		EndDate: "",
		status: "PUBLISHED",
		class: "Business",
		weight: 1000,
		decommissioned: true
	},
	{
		id: 12,
		code: "CONT12",
		name: "0608-RH-01",
		virtual: true,
		version: "1",
		EffDate: "1/1/2000",
		EndDate: "",
		status: "DRAFT",
		class: "Business",
		weight: 1000,
		decommissioned: false
	},
	{
		id: 13,
		code: "CONT13",
		name: "0608-TH-01",
		virtual: false,
		version: "3",
		EffDate: "1/1/2010",
		EndDate: "",
		status: "PUBLISHED",
		class: "Business",
		weight: 1000,
		decommissioned: true
	},
	{
		id: 14,
		code: "CONT14",
		name: "bowl",
		virtual: true,
		version: "1",
		EffDate: "15/12/2016",
		EndDate: "",
		status: "PUBLISHED",
		class: "Business",
		weight: 130000,
		decommissioned: false
	},
	{
		id: 15,
		code: "CONT15",
		name: "bottle",
		virtual: false,
		version: "2",
		EffDate: "16/12/2015",
		EndDate: "",
		status: "PUBLISHED",
		class: "Common",
		weight: 10000,
		decommissioned: true
	},
	{
		id: 16,
		code: "CONT16",
		name: "bottle",
		virtual: true,
		version: "2",
		EffDate: "16/12/2015",
		EndDate: "",
		status: "PUBLISHED",
		class: "Common",
		weight: 10000,
		decommissioned: false
	},
	{
		id: 17,
		code: "CONT17",
		name: "bottle",
		virtual: false,
		version: "2",
		EffDate: "16/12/2016",
		EndDate: "",
		status: "PUBLISHED",
		class: "Common",
		weight: 10000,
		decommissioned: true
	}
];

export const columnTitle = [
	{
		id: 1,
		name: "Code"
	},
	{
		id: 2,
		name: "Name"
	},
	{
		id: 3,
		name: "Is Virtual"
	},
	{
		id: 4,
		name: "Version"
	},
	{
		id: 5,
		name: "Eff. Date"
	},
	{
		id: 6,
		name: "End Date"
	},
	{
		id: 7,
		name: "Status"
	},
	{
		id: 9,
		name: "Class"
	},
	{
		id: 9,
		name: "Container Weight"
	},
	{
		id: 10,
		name: "Decomissioned"
	}
];
