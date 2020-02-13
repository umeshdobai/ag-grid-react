import React, { Component } from "react";
import "antd/dist/antd.css";
import { Icon, Calendar } from "antd";

const dateFormatList = ["DD/MM/YYYY"];

export default class PartialMatchFilter extends Component {
	constructor(props) {
		super(props);

		this.state = {
			text: "",
			greaterThan: "",
			lesserThan: "",
			equals: "",
			displayCalendar: false
		};
		this.valueGetter = this.props.valueGetter;
		this.onChange = this.onChange.bind(this);
	}

	isFilterActive() {
		return (
			this.state.text !== null &&
			this.state.text !== undefined &&
			this.state.text !== ""
		);
	}

	doesFilterPass(params) {
		return this.state.text
			.toLowerCase()
			.split(" ")
			.every(filterWord => {
				return (
					this.valueGetter(params.node)
						.toString()
						.toLowerCase()
						.indexOf(filterWord) >= 0
				);
			});
	}

	getModel(params) {
		return { value: this.state.text };
	}

	setModel(model) {
		this.state.text = model ? model.value : "";
	}

	onChange(event) {
		let newValue = event.target.value;
		if (this.state.text !== newValue) {
			this.setState(
				{
					text: newValue
				},
				() => {
					this.props.filterChangedCallback();
				}
			);
		}
	}

	onPanelChange = (value, mode) => {
		console.log(value, mode, "value,mode");
	};

	displayCalendar = () => {
		console.log("displayCalendar", "displayCalendar");
		return (
			<div style={{ width: 300, border: "1px solid #d9d9d9", borderRadius: 4 }}>
				<Calendar fullscreen={false} onPanelChange={this.onPanelChange} />
			</div>
		);
	};

	render() {
		let style = {
			borderRadius: "5px",
			minWidth: "120px",
			height: "auto",
			padding: "8px"
		};
		const lessThan = "<";

		{
			switch (this.props.colDef.headerName) {
				case "Version":
				case "Eff. Date":
				case "End Date":
					return (
						<div style={style}>
							<div className="input-container">
								<span>></span>
								<input
									style={{ height: "20px" }}
									ref="input"
									name="greaterThan"
									value={this.state.greaterThan}
									// onChange={this.props.externalFilterChanged}
									className="form-control"
								/>

								{this.props.colDef.headerName.includes("Date") ? (
									<div>
										<span onClick={() => this.displayCalendar()}>
											<Icon type="calendar" theme="twoTone" />
										</span>
										<span>
											<Icon type="close" />
										</span>
									</div>
								) : null}
							</div>
							<div className="input-container">
								<span>{lessThan}</span>
								<input
									style={{ height: "20px" }}
									ref="input"
									name="lesserThan"
									value={this.state.lesserThan}
									onChange={this.onHandleChange}
									className="form-control"
								/>

								{this.props.colDef.headerName.includes("Date") ? (
									<div>
										<Icon type="calendar" theme="twoTone" />
										<Icon type="close" />
									</div>
								) : null}
							</div>
							<div className="input-container">
								<span>=</span>
								<input
									style={{ height: "20px" }}
									ref="input"
									name="equals"
									value={this.state.equals}
									onChange={this.onHandleChange}
									className="form-control"
								/>
								{this.props.colDef.headerName.includes("Date") ? (
									<div>
										<Icon type="calendar" theme="twoTone" />
										<Icon type="close" />
									</div>
								) : null}
							</div>
						</div>
					);
					break;
				case "Is Virtual" :
					return(<div style={style}>
						<div className="input-container">
							<input 
								style={{ height: "20px" }}
								type="radio" 
								value="yes"
								className="form-control"/>Yes
						</div>
						<div className="input-container">
							<input 
								style={{ height: "20px" }}
								type="radio" 
								value="yes"
								className="form-control"/>No
						</div>
						<div className="input-container">
							<input 
								style={{ height: "20px" }}
								type="radio" 
								value="yes"
								className="form-control"/>None
						</div>
					</div>)
				default:
					return (
						<div style={style}>
							<input
								style={{ height: "20px" }}
								ref="input"
								value={this.state.text}
								onChange={this.onChange}
								className="form-control"
							/>
						</div>
					);
			}
		}
	}
}
