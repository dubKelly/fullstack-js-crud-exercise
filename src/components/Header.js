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

	const breakpoints = [640];

	const mq = breakpoints.map(
		bp => `@media only screen and (min-width: ${bp}px)`
	);

	const component = css({
		position: 'relative',
		height: '90px'
	});

	const h1 = css({
		position: 'absolute',
		top: '50%',
		left: '30px',
		transform: 'translateY(-50%)',
		padding: '0',
		fontSize: '24px',
		textTransform: 'uppercase',
		letterSpacing: '12px',
		color: !props.nightMode ? _dark : 'white',
		[mq[0]]: {
			left: '60px',
			fontSize: '32px',
			letterSpacing: '15px'
		}
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
				disabled={props.disabled}
				addClick={props.addClick}
				toggleNightMode={props.toggleNightMode}
				toggleExpanded={props.toggleExpanded}
				toggleColors={props.toggleColors}
			/>
		</div>
	);
};

export default Header;
