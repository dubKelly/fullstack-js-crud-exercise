import React from 'react';
import { Link } from 'react-router-dom';
import { css } from 'emotion';

import Add from './icons/Add';
import Expand from './icons/Expand';
import Retract from './icons/Retract';
import NightMode from './icons/NightMode';
import DayMode from './icons/DayMode';
import Colors from './icons/Colors';

const Tools = props => {
	////////////////////////////////////////////////////////
	////     //        //  ///  //  ///////       //     ///
	///  /////////  //////  /  ///  ///////  //////  ///////
	////    //////  ///////  /////  ///////     ////    ////
	///////  /////  ///////  /////  ///////  //////////  ///
	///     //////  ///////  /////       //       //     ///
	////////////////////////////////////////////////////////

	const component = css({
		display: 'flex',
		position: 'absolute',
		alignItems: 'center',
		top: '50%',
		left: '15px',
		transform: 'translate(0, -50%)',
		opacity: !props.menu ? '0' : '1',
		zIndex: !props.menu ? '-1' : '3',
		transition: 'all 0.3s ease-in-out',
		'@media only screen and (min-width: 500px)': {
			left: 'calc(100% - 30px)',
			transform: 'translate(-100%, -50%)',
			opacity: '1',
			zIndex: '3'
		}
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

	const nightModeContainer = css({
		height: !props.nightMode ? '30px' : '24px',
		width: !props.nightMode ? '30px' : '24px',
		margin: !props.nightMode ? '0 12px' : '0 15px'
	});

	///////   ///////  ///   //  //////    ///////  ///////
	//    //  //       ////  //  //   //   //       //    //
	///////   /////    // // //  //    //  /////    ///////
	//  //    //       //  ////  //   //   //       //  //
	//   //   ///////  //   ///  //////    ///////  //   //

	return (
		<div className={component}>
			<div className={`${addContainer} ${svgContainer}`}>
				<Link to="/add-employee" className="svgCover" />
				<Add nightMode={props.nightMode} />
			</div>
			<div className={svgContainer}>
				<div
					className={`svgCover disabled${props.disabled}`}
					onClick={props.toggleExpanded}
				/>
				<Expand nightMode={props.nightMode} expanded={props.expanded} />
				<Retract nightMode={props.nightMode} expanded={props.expanded} />
			</div>
			<div className={`${nightModeContainer} ${svgContainer}`}>
				<div className="svgCover" onClick={props.toggleNightMode} />
				<NightMode nightMode={props.nightMode} />
				<DayMode nightMode={props.nightMode} />
			</div>
			<div className={svgContainer}>
				<div
					className={`svgCover disabled${props.disabled}`}
					onClick={props.toggleColors}
				/>
				<Colors />
			</div>
		</div>
	);
};

export default Tools;
