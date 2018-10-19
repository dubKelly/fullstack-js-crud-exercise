import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { css } from 'emotion';

import Header from './components/Header';
import Table from './components/pages/Table';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			nightMode: false,
			expanded: false
		};
	}

	///////   ///////  ///   //  //////    ///////  ///////
	//    //  //       ////  //  //   //   //       //    //
	///////   /////    // // //  //    //  /////    ///////
	//  //    //       //  ////  //   //   //       //  //
	//   //   ///////  //   ///  //////    ///////  //   //

	render() {
		const { nightMode, expanded } = this.state;

		return (
			<Router>
				<div className={component}>
					<Header nightMode={nightMode} expanded={expanded} />
					<Route
						exact
						path="/"
						render={() => <Table nightMode={nightMode} expanded={expanded} />}
					/>
				</div>
			</Router>
		);
	}
}

////////////////////////////////////////////////////////
////     //        //  ///  //  ///////       //     ///
///  /////////  //////  /  ///  ///////  //////  ///////
////    //////  ///////  /////  ///////     ////    ////
///////  /////  ///////  /////  ///////  //////////  ///
///     //////  ///////  /////       //       //     ///
////////////////////////////////////////////////////////

const component = css({
	height: '100vh',
	width: '100%'
});

export default App;
