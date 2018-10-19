import React from 'react';
import { css } from 'emotion';

///////   ///////  ///   //  //////    ///////  ///////
//    //  //       ////  //  //   //   //       //    //
///////   /////    // // //  //    //  /////    ///////
//  //    //       //  ////  //   //   //       //  //
//   //   ///////  //   ///  //////    ///////  //   //

const Header = props => {
	return (
		<div className={component}>
			<h1 className={h1}>Plexxis</h1>
		</div>
	);
};

////////////////////////////////////////////////////////
////     //        //  ///  //  ///////       //     ///
///  /////////  //////  /  ///  ///////  //////  ///////
////    //////  ///////  /////  ///////     ////    ////
///////  /////  ///////  /////  ///////  //////////  ///
///     //////  ///////  /////       //       //     ///
////////////////////////////////////////////////////////

const component = css({
	position: 'relative',
	height: '60px'
});

const h1 = css({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	padding: '0',
	fontSize: '32px',
	textTransform: 'uppercase',
	letterSpacing: '9px'
});

export default Header;
