import React from 'react';
import { css } from 'emotion';

import Tools from './Tools';

///////   ///////  ///   //  //////    ///////  ///////
//    //  //       ////  //  //   //   //       //    //
///////   /////    // // //  //    //  /////    ///////
//  //    //       //  ////  //   //   //       //  //
//   //   ///////  //   ///  //////    ///////  //   //

const Header = props => {
	return (
		<div className={component}>
			<h1 className={h1}>Plexxis</h1>
			<Tools nightMode={props.nightMode} expanded={props.expanded} />
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
	height: '90px'
});

const h1 = css({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	padding: '0',
	fontSize: '32px',
	textTransform: 'uppercase',
	letterSpacing: '15px'
});

export default Header;
