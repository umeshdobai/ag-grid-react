import React from "react";
import "antd/dist/antd.css";
import { Table, Button, Input, Icon } from "antd";

const data = [
	{
		key: "1",
		name: "John Brown",
		age: 32,
		address: "New York No. 1 Lake Park"
	},
	{
		key: "2",
		name: "Jim Green",
		age: 42,
		address: "London No. 1 Lake Park"
	},
	{
		key: "3",
		name: "Joe Black",
		age: 32,
		address: "Sidney No. 1 Lake Park"
	},
	{
		key: "4",
		name: "Jim Red",
		age: 32,
		address: "London No. 2 Lake Park"
	}
];

class GridComponent extends React.Component {
	state = {
		filteredInfo: null,
		sortedInfo: null
	};

	handleChange = (pagination, filters, sorter) => {
		console.log("Various parameters", pagination, filters, sorter);
		this.setState({
			filteredInfo: filters,
			sortedInfo: sorter
		});
	};

	clearFilters = () => {
		this.setState({ filteredInfo: null });
	};

	clearAll = () => {
		this.setState({
			filteredInfo: null,
			sortedInfo: null
		});
	};

	setAgeSort = () => {
		this.setState({
			sortedInfo: {
				order: "descend",
				columnKey: "age"
			}
		});
	};

	getColumnSearchProps = dataIndex => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters
		}) => (
			<div style={{ padding: 8 }}>
				<Input
					ref={node => {
						this.searchInput = node;
					}}
					placeholder={`Search ${dataIndex}`}
					// value={selectedKeys[0]}
					onChange={e =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() =>
						this.handleSearch(selectedKeys, confirm, dataIndex)
					}
					style={{ width: 188, marginBottom: 8, display: "block" }}
				/>
				<Button
					type="primary"
					onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
					icon="filter"
					size="small"
					style={{ width: 90, marginRight: 8 }}
				>
					Search
				</Button>
				<Button
					onClick={() => this.handleReset(clearFilters)}
					size="small"
					style={{ width: 90 }}
				>
					Reset
				</Button>
			</div>
		),
		filterIcon: filtered => (
			<Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
		),
		onFilter: (value, record) =>
			record[dataIndex]
				.toString()
				.toLowerCase()
				.includes(value.toLowerCase()),
		onFilterDropdownVisibleChange: visible => {
			if (visible) {
				setTimeout(() => this.searchInput.select());
			}
		},
		render: text =>
			this.state.searchedColumn === dataIndex
				? // <Highlighter
				  // 	highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
				  // 	searchWords={[this.state.searchText]}
				  // 	autoEscape
				  // 	textToHighlight={text.toString()}
				  // />
				  console.log(text, "text")
				: text
	});

	render() {
		let { sortedInfo, filteredInfo } = this.state;
		sortedInfo = sortedInfo || {};
		filteredInfo = filteredInfo || {};
		const columns = [
			{
				title: "Name",
				dataIndex: "name",
				key: "name",
				filters: [
					{ text: "Joe", value: "Joe" },
					{ text: "Jim", value: "Jim" }
				],
				filteredValue: filteredInfo.name || null,
				onFilter: (value, record) => record.name.includes(value),
				sorter: (a, b) => a.name.length - b.name.length,
				sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
				ellipsis: true,
				...this.getColumnSearchProps("name")
			},
			{
				title: "Age",
				dataIndex: "age",
				key: "age",
				sorter: (a, b) => a.age - b.age,
				sortOrder: sortedInfo.columnKey === "age" && sortedInfo.order,
				ellipsis: true
			},
			{
				title: "Address",
				dataIndex: "address",
				key: "address",
				filters: [
					{ text: "London", value: "London" },
					{ text: "New York", value: "New York" }
				],
				filteredValue: filteredInfo.address || null,
				onFilter: (value, record) => record.address.includes(value),
				sorter: (a, b) => a.address.length - b.address.length,
				sortOrder: sortedInfo.columnKey === "address" && sortedInfo.order,
				ellipsis: true
			}
		];
		return (
			<div>
				<div className="table-operations">
					<Button onClick={this.setAgeSort}>Sort age</Button>
					<Button onClick={this.clearFilters}>Clear filters</Button>
					<Button onClick={this.clearAll}>Clear filters and sorters</Button>
				</div>
				<Table
					columns={columns}
					dataSource={data}
					onChange={this.handleChange}
				/>
			</div>
		);
	}
}

export default GridComponent;
