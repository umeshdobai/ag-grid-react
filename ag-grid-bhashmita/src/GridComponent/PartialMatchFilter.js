import React, { Component } from "react";
import PropTypes from 'prop-types';
import "antd/dist/antd.css";
import { Icon, Calendar, Popover } from "antd";
import {columnDefs} from './GridData';


export default class PartialMatchFilter extends Component {
	static propTypes = {
        onClick: PropTypes.func,
        value: PropTypes.string
    }
	constructor(props) {
		super(props);

		this.state = {
			text: "",
			greaterThan: "",
			lesserThan: "",
			equals: "",
			displayCalendar: false,

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
		//this.state.text = model ? model.value : "";
		this.setState({text: model ? model.value : "" })
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
			<div style={{ width: "600px", border: "1px solid #d9d9d9" ,borderRadius: 4 }}>
				<Calendar fullscreen={false} onPanelChange={this.onPanelChange} />
			</div>
		);
	};

	render() {
		let style = {
			borderRadius: "2px",
			minWidth: "120px",
			height: "auto",
			padding: "5px",
		};
		
		console.log(columnDefs)
		const lessThan = "<";
		const content = ( <div style={{ width: 250, border: '1px solid #d9d9d9', borderRadius: 4 }}>
		<Calendar fullscreen={false} onChange={this.onPanelChange} />
	  </div>)

		
			switch (this.props.colDef.headerName) {
				case "Version":
				case "Eff. Date":
				case "End Date":
					return (
						<div style={style}>
							<div className="input-container">
								<span>></span>
								<input
									style={{ height: "20px"  }}
									ref="input"
									name="greaterThan"
									value={this.state.greaterThan}
									// onChange={this.props.externalFilterChanged}
									className="form-control"
								/>

								{this.props.colDef.headerName.includes("Date") ? (
									<div>
										<span >
										<Popover placement="right"  content={content} trigger="click" >
											<Icon type="calendar" theme="twoTone" onClick={this.openDatepicker} /></Popover>
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
					
				case "Is Virtual" :
					return(<div style={style}>
						<div className="input-container"  >
							<input 
								style={{ height: "10px" }}
								type="radio" 
								name="isvirtual"
								value="yes"/>Yes
						</div>
						<div className="input-container">
							<input 
								style={{ height: "10px" }}
								type="radio"
								name="isvirtual" 
								value="no"
								className="form-control"/>No
						</div>
						<div className="input-container" style={{marginLeft: "5px"}}>
							<input 
								style={{ height: "10px" }}
								type="radio"
								name="isvirtual" 
								value="yes"
								className="form-control"/>None
						</div>
					</div>);
					
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

