import React, { Component } from 'react'


class AgGridCheckboxComponent extends Component {
    
    render() {
            return <input type="checkbox" disabled checked={this.props.data.decommissioned} style={{marginLeft:"60px"}}/>
          
    }
}

export default AgGridCheckboxComponent