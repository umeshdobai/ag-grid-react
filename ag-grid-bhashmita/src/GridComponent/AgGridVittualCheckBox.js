import React, { Component } from 'react'

class AgGridVittualCheckBox extends Component {
    render() {
        return (<input type="checkbox" disabled checked={this.props.data.virtual} style={{marginLeft:"60px"}}/>
        )
    }
}

export default AgGridVittualCheckBox
