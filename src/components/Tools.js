import React from 'react';
import { css } from 'emotion';

import Add from './icons/Add';
import Expand from './icons/Expand';
import Retract from './icons/Retract';
import NightMode from './icons/NightMode';
import DayMode from './icons/DayMode';
import Colors from './icons/Colors';

///////   ///////  ///   //  //////    ///////  ///////
//    //  //       ////  //  //   //   //       //    //
///////   /////    // // //  //    //  /////    ///////
//  //    //       //  ////  //   //   //       //  //
//   //   ///////  //   ///  //////    ///////  //   //

const Tools = props => {
	return (
		<div className={component}>
			<div className={`${addContainer} ${svgContainer}`}>
				<div className="svgCover" />
				<Add />
			</div>
			<div className={svgContainer}>
				<div className="svgCover" />
				<Expand expanded={props.expanded} />
				<Retract expanded={props.expanded} />
			</div>
			<div className={svgContainer}>
				<div className="svgCover" />
				<NightMode nightMode={props.nightMode} />
				<DayMode nightMode={props.nightMode} />
			</div>
			<div className={svgContainer}>
				<div className="svgCover" />
				<Colors />
			</div>
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
	display: 'flex',
	alignItems: 'center',
	position: 'absolute',
	top: '50%',
	right: '30px',
	transform: 'translateY(-50%)'
});

const svgContainer = css({
	display: 'inline-block',
	position: 'relative',
	height: '24px',
	width: '24px',
	margin: '0 15px'
});

const addContainer = css({
	height: '20px',
	width: '20px'
});

export default Tools;
