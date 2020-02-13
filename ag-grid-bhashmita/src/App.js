import React from "react";
import "./App.css";
import AgGridComponent from "./GridComponent/AgGridComponent";

//Font Awesome Library....
import { library } from '@fortawesome/fontawesome-svg-core';
import {  faTimes, faCaretUp, faCaretDown, faFilter, faColumns  } from '@fortawesome/free-solid-svg-icons';

library.add(  faTimes, faCaretUp, faCaretDown, faFilter, faColumns  );

function App() {
	return (
		<div className="App">
			{/* <GridComponent /> */}
			{/* <GridTableComponent /> */}
			<AgGridComponent />
		</div>
	);
}

export default App;
