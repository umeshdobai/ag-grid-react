// import React from "react";
// import "antd/dist/antd.css";
// import {
// 	Table,
// 	Icon,
// 	Button,
// 	Dropdown,
// 	Menu,
// 	Input
// } from "antd";
// import "./styles.css";
// const { Search } = Input;

// const data = [];
// for (let i = 1; i <= 20; i++) {
// 	data.push({
// 		key: i,
// 		name: "John Brown",
// 		age: `${i}2`,
// 		address: `New York No. ${i} Lake Park`
// 	});
// }


// const footer = () => {
// 	return (
// 		<div>
// 			<span>Quick Look</span>
// 			<Search
// 				placeholder="input search text"
// 				onSearch={value => console.log(value)}
// 				style={{ width: 200, display: "flex" }}
// 				enterButton
// 			/>
// 		</div>
// 	);
// };


// class GridTableComponent extends React.Component {
// 	state = {
// 		filteredInfo: null,
// 		sortedInfo: null
// 	};

// 	handleChange = (pagination, filters, sorter) => {
// 		console.log("Various parameters", pagination, filters, sorter);
// 		this.setState({
// 			filteredInfo: filters,
// 			sortedInfo: sorter
// 		});
// 	};

// 	getColumnSearchProps = dataIndex => ({
// 		filterDropdown: ({
// 			setSelectedKeys,
// 			selectedKeys,
// 			confirm,
// 			clearFilters
// 		}) => (
// 			<div style={{ padding: 8 }}>
// 				<Input
// 					ref={node => {
// 						this.searchInput = node;
// 					}}
// 					placeholder={`Search ${dataIndex}`}
// 					// value={selectedKeys[0]}
// 					onChange={e =>
// 						setSelectedKeys(e.target.value ? [e.target.value] : [])
// 					}
// 					onPressEnter={() =>
// 						this.handleSearch(selectedKeys, confirm, dataIndex)
// 					}
// 					style={{ width: 188, marginBottom: 8, display: "block" }}
// 				/>
// 				<Button
// 					type="primary"
// 					onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
// 					icon="filter"
// 					size="small"
// 					style={{ width: 90, marginRight: 8 }}
// 				>
// 					Search
// 				</Button>
// 				<Button
// 					onClick={() => this.handleReset(clearFilters)}
// 					size="small"
// 					style={{ width: 90 }}
// 				>
// 					Reset
// 				</Button>
// 			</div>
// 		),
// 		filterIcon: filtered => (
// 			<Icon type="filter" style={{ color: filtered ? "#1890ff" : undefined }} />
// 		),
// 		onFilter: (value, record) =>
// 			record[dataIndex]
// 				.toString()
// 				.toLowerCase()
// 				.includes(value.toLowerCase()),
// 		onFilterDropdownVisibleChange: visible => {
// 			if (visible) {
// 				setTimeout(() => this.searchInput.select());
// 			}
// 		},
// 		render: text =>
// 			this.state.searchedColumn === dataIndex
// 				? // <Highlighter
// 				  // 	highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
// 				  // 	searchWords={[this.state.searchText]}
// 				  // 	autoEscape
// 				  // 	textToHighlight={text.toString()}
// 				  // />
// 				  console.log(text, "text")
// 				: text
// 	});

// 	clearFilters = () => {
// 		this.setState({ filteredInfo: null });
// 	};

// 	clearAll = () => {
// 		this.setState({
// 			filteredInfo: null,
// 			sortedInfo: null
// 		});
// 	};

// 	setAgeSort = () => {
// 		this.setState({
// 			sortedInfo: {
// 				order: "descend",
// 				columnKey: "age"
// 			}
// 		});
// 	};

// 	render() {
// 		let { sortedInfo, filteredInfo } = this.state;
// 		sortedInfo = sortedInfo || {};
// 		filteredInfo = filteredInfo || {};
// 		const columns = [
// 			{
// 				title: "Name",
// 				dataIndex: "name",
// 				key: "name",
// 				width: 200,
// 				sorter: (a, b) => a.name.length - b.name.length,
// 				sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
// 				...this.getColumnSearchProps("name")
// 			},
// 			{
// 				title: "Age",
// 				dataIndex: "age",
// 				key: "age",
// 				width: 200,
// 				sorter: (a, b) => a.age - b.age,
// 				sortOrder: sortedInfo.columnKey === "age" && sortedInfo.order,
// 				...this.getColumnSearchProps("age")
// 			},
// 			{
// 				title: "Address",
// 				dataIndex: "address",
// 				key: "address",
// 				width: 200,
// 				sorter: (a, b) => a.address.length - b.address.length,
// 				sortOrder: sortedInfo.columnKey === "address" && sortedInfo.order,
// 				...this.getColumnSearchProps("address")
// 			}
// 		];

// 		const { state } = this;

// 		const menu = (
// 			<Menu>
// 				<Menu.Item key="1">1st item</Menu.Item>
// 				<Menu.Item key="2">2nd item</Menu.Item>
// 				<Menu.Item key="3">3rd item</Menu.Item>
// 			</Menu>
// 		);
// 		const rowSelection = {
// 			onChange: (selectedRowKeys, selectedRows) => {
// 				console.log(
// 					`selectedRowKeys: ${selectedRowKeys}`,
// 					"selectedRows: ",
// 					selectedRows
// 				);
// 			},
// 			getCheckboxProps: record => ({
// 				disabled: record.name === "Disabled User", // Column configuration not to be checked
// 				name: record.name
// 			})
// 		};
// 		return (
// 			<div style={{ width: "100%", height: "100%" }}>
// 				<div className="table-operations">
// 					<Button onClick={this.setAgeSort}>Sort age</Button>
// 					<Button onClick={this.clearFilters}>Clear filters</Button>
// 					<Button onClick={this.clearAll}>Clear filters and sorters</Button>
// 					<Dropdown overlay={menu}>
// 						<Button>
// 							More Actions <Icon type="down" />
// 						</Button>
// 					</Dropdown>
// 				</div>
// 				<div>
// 					<Table
// 						bordered
// 						hover
// 						className="table table-striped"
// 						size="middle"
// 						footer={footer}
// 						scroll
// 						// showHeader={false}
// 						rowSelection={rowSelection}
// 						columns={columns.map(item => ({ ...item }))}
// 						dataSource={data}
// 						onChange={this.handleChange}
// 					></Table>
// 				</div>
// 			</div>
// 		);
// 	}
// }

// export default GridTableComponent;
