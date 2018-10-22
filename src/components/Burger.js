import React from 'react';
import { css } from 'emotion';
import { _dark } from '../lib/vars';

const Burger = props => {
	/////////////////////////////////////////////////////////
	////     //         //  ///  //  ///////       //     ///
	///  /////////  ///////  /  ///  ///////  //////  ///////
	////    //////  ////////  /////  ///////     ////    ////
	///////  /////  ////////  /////  ///////  //////////  ///
	///     //////  ////////  /////       //       //     ///
	/////////////////////////////////////////////////////////

	const component = css({
		position: 'absolute',
		top: '50%',
		right: '30px',
		transform: 'translateY(-50%)',
		height: '30px',
		width: '30px',
		transition: 'all 0.3s ease-in-out',
		'@media only screen and (min-width: 500px)': {
			display: 'none'
		}
	});

	const cover = css({
		position: 'absolute',
		top: '0',
		left: '0',
		height: '100%',
		width: '100%',
		cursor: 'pointer'
	});

	const span = css({
		content: '""',
		position: 'absolute',
		height: '1px',
		width: '30px',
		borderRadius: '1px',
		backgroundColor: !props.nightMode ? _dark : 'white',
		transition: 'transform 0.3s ease-in-out'
	});

	const top = !props.menu
		? css({
				top: '3px'
		  })
		: css({
				top: '3px',
				transform: 'translate(-2px, 10px) rotate(-45deg) scale(0.8, 2)'
		  });

	const pos = !props.menu
		? css({
				top: '15px'
		  })
		: css({
				top: '15px',
				transform: 'rotate(45deg) translate(2px, -2px) scale(0.6, 2)'
		  });

	const neg = !props.menu
		? css({
				top: '15px'
		  })
		: css({
				top: '15px',
				transform: 'rotate(45deg) translate(-2px, 2px) scale(0.6, 2)'
		  });

	const bottom = !props.menu
		? css({
				top: '26px'
		  })
		: css({
				top: '26px',
				transform: 'translate(2px, -8px) rotate(-45deg) scale(0.8, 2)'
		  });

	///////   ///////  ///   //  //////    ///////  ///////
	//    //  //       ////  //  //   //   //       //    //
	///////   /////    // // //  //    //  /////    ///////
	//  //    //       //  ////  //   //   //       //  //
	//   //   ///////  //   ///  //////    ///////  //   //

	return (
		<div className={component}>
			<span className={`${span} ${top}`} />
			<span className={`${span} ${pos}`} />
			<span className={`${span} ${neg}`} />
			<span className={`${span} ${bottom}`} />
			<div onClick={props.toggleMenu} className={cover} />
		</div>
	);
};

export default Burger;
