import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { css } from 'emotion';

import { _dark } from './lib/vars';

import Header from './components/Header';
import Table from './components/pages/Table';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			nightMode: false,
			expanded: false
		};

		this.toggleNightMode = this.toggleNightMode.bind(this);
		this.toggleExpanded = this.toggleExpanded.bind(this);
	}

	///////////////////////////////////////////////////////////
	////     ///  ///  ///     //        ///     ///   //   ///
	///  ///  //  ///  //  /////////  /////  ///  //        ///
	///  ///////  ///  ///    //////  /////  ///  //  /  /  ///
	///  ///  //  ///  //////  /////  /////  ///  //  ////  ///
	////     ////     ///     //////  //////     ///  ////  ///
	///////////////////////////////////////////////////////////

	toggleNightMode() {
		let { nightMode } = this.state;
		nightMode = !nightMode;

		this.setState({ nightMode });
	}

	toggleExpanded() {
		let { expanded } = this.state;
		expanded = !expanded;

		this.setState({ expanded });
	}

	render() {
		const { nightMode, expanded } = this.state;

		////////////////////////////////////////////////////////
		////     //        //  ///  //  ///////       //     ///
		///  /////////  //////  /  ///  ///////  //////  ///////
		////    //////  ///////  /////  ///////     ////    ////
		///////  /////  ///////  /////  ///////  //////////  ///
		///     //////  ///////  /////       //       //     ///
		////////////////////////////////////////////////////////

		const component = css({
			height: '100vh',
			width: '100%',
			backgroundColor: !nightMode ? '' : _dark
		});

		///////   ///////  ///   //  //////    ///////  ///////
		//    //  //       ////  //  //   //   //       //    //
		///////   /////    // // //  //    //  /////    ///////
		//  //    //       //  ////  //   //   //       //  //
		//   //   ///////  //   ///  //////    ///////  //   //

		return (
			<Router>
				<div className={component}>
					<Header
						nightMode={nightMode}
						expanded={expanded}
						toggleNightMode={this.toggleNightMode}
						toggleExpanded={this.toggleExpanded}
					/>
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

export default App;
