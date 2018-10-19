import React, { Component } from 'react';
import { css } from 'emotion';

import Header from './components/Header';
import Table from './components/pages/Table';

class App extends Component {
	///////   ///////  ///   //  //////    ///////  ///////
	//    //  //       ////  //  //   //   //       //    //
	///////   /////    // // //  //    //  /////    ///////
	//  //    //       //  ////  //   //   //       //  //
	//   //   ///////  //   ///  //////    ///////  //   //

	render() {
		return (
			<div className={component}>
				<Header />
				<Table />
			</div>
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
