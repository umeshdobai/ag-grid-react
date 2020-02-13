import React, { Component } from "react";
// import { Icon } from "antd";
import './styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
					<FontAwesomeIcon  data-toggle="tooltip" data-placement="top" size="xs" title="filter" icon={this.props.menuIcon}  />
					{/* <Icon  data-toggle="tooltip" data-placement="top" title="filter" type={this.props.menuIcon} theme="filled" /> */}
				</div>
			);
		}
			let sort = null;
			if (this.props.enableSorting === true) {
				sort =
					(<div style={{display: "inline-block"}}>
						<div onClick={this.onSortRequested.bind(this, 'asc')} onTouchEnd={this.onSortRequested.bind(this, 'asc')} className={`customSortDownLabel ${this.state.ascSort}`}>
							
							<FontAwesomeIcon data-toggle="tooltip" data-placement="top" title="ascending"  icon="caret-down" />
						</div>
						
					</div>);
			}
			
				if(this.state.ascSort === 'active'){
					sort =
					(<div style={{display: "inline-block"}}>
						<div onClick={this.onSortRequested.bind(this, 'desc')} onTouchEnd={this.onSortRequested.bind(this, 'desc')} className={`customSortUpLabel ${this.state.descSort}`}>
							<FontAwesomeIcon  data-toggle="tooltip" data-placement="top" title="descending" icon="caret-up" />
						</div>
					</div>);
				}
			
	
		return (
			<div>
				<div className="customHeaderLabel">
					{menu}
					<span>{this.props.displayName}</span>
				</div>{sort}
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
	onMenuClick() {
        this.props.showColumnMenu(this.menuButton);
    }

    onSortRequested(order, event) {
        this.props.setSort(order, event.shiftKey);
    }
}

