import React, { Component } from "react";
import { Icon } from "antd";

export default class CustomHeader extends Component {
	constructor(props) {
		super(props);

		this.state = {
			ascSort: "inactive",
			descSort: "inactive",
			noSort: "inactive"
		};

		props.column.addEventListener("sortChanged", this.onSortChanged.bind(this));
	}

	componentDidMount() {
		this.onSortChanged();
	}

	render() {
		let menu = null;
		if (this.props.enableMenu) {
			menu = (
				<div
					ref={menuButton => {
						this.menuButton = menuButton;
					}}
					className="customHeaderMenuButton"
					onClick={this.onMenuClicked.bind(this)}
				>
					<Icon type={this.props.menuIcon} theme="filled" />
				</div>
			);
		}
		return (
			<div>
				<div className="customHeaderLabel">
					{menu}
					<span>{this.props.displayName}</span>
				</div>
			</div>
		);
	}

	onMenuClicked() {
		this.props.showColumnMenu(this.menuButton);
	}

	onSortChanged() {
		this.setState({
			ascSort: this.props.column.isSortAscending() ? "active" : "inactive",
			descSort: this.props.column.isSortDescending() ? "active" : "inactive",
			noSort:
				!this.props.column.isSortAscending() &&
				!this.props.column.isSortDescending()
					? "active"
					: "inactive"
		});
	}
}
