import React from 'react';
import { css } from 'emotion';

import { _dark } from '../lib/vars';

import Tools from './Tools';

const Header = props => {
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
		left: '60px',
		transform: 'translateY(-50%)',
		padding: '0',
		fontSize: '32px',
		textTransform: 'uppercase',
		letterSpacing: '15px',
		color: !props.nightMode ? _dark : 'white'
	});

	///////   ///////  ///   //  //////    ///////  ///////
	//    //  //       ////  //  //   //   //       //    //
	///////   /////    // // //  //    //  /////    ///////
	//  //    //       //  ////  //   //   //       //  //
	//   //   ///////  //   ///  //////    ///////  //   //

	return (
		<div className={component}>
			<h1 className={h1}>Plexxis</h1>
			<Tools
				nightMode={props.nightMode}
				expanded={props.expanded}
				toggleNightMode={props.toggleNightMode}
				toggleExpanded={props.toggleExpanded}
				toggleColors={props.toggleColors}
			/>
		</div>
	);
};

export default Header;
